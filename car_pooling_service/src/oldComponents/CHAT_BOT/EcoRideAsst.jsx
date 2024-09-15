import React from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import ReactMarkdown from 'react-markdown'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY)
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction:
    "You are Ecoride Assistant, a friendly support assistant for all customers of a car pooling service. Your responses should be helpful, concise, and professional. If a user enters an issue that you can't assist with, provide the following message: \"I'm sorry, I can't assist with that issue. Please contact the developer at pavithrang126@gmail.com.\" Ensure your responses do not exceed 50 words, but can go up to 100 words if necessary.",
})
export default function RideAssistant() {
  const [input, setInput] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)
  const [data, setData] = React.useState([
    { input: '', response: 'Hi there! I am eco-ride assistant' },
  ])

  React.useEffect(() => {
    const storedData = localStorage.getItem('myData')
    if (storedData) {
      setData(JSON.parse(storedData))
    }
  }, [])

  async function getResponse() {
    const prompt = input
    setData((prevData) => [
      ...prevData,
      { input: prompt, response: 'Generating response...' },
    ])

    try {
      const result = await model.generateContent(prompt)
      const responseText = result.response.candidates[0].content.parts[0].text

      setData((prevData) => {
        const newData = [...prevData]
        const lastIndex = newData.length - 1
        newData[lastIndex] = {
          ...newData[lastIndex],
          response: responseText,
        }
        localStorage.setItem('myData', JSON.stringify(newData))
        return newData
      })
    } catch (error) {
      setData((prevData) => {
        const newData = [...prevData]
        const lastIndex = newData.length - 1
        newData[lastIndex] = {
          ...newData[lastIndex],
          response: '**Error generating response, Kindly retry**',
        }
        return newData
      })
    }
  }

  function handleNewChat() {
    setData([{ input: '', response: 'Hi there! I am eco-ride assistant' }])
    localStorage.removeItem('myData')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (input === '') return
    getResponse()
    setInput('')
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    }, 1000)
  }

  return (
    <>
      <div
        className={`fixed bottom-0 right-0 m-4  ${
          isOpen ? 'w-[350px] h-[500px]' : 'w-[50px] h-[50px]'
        } backdrop-blur-lg border border-green-400 rounded-2xl shadow-lg z-50`}
      >
        {isOpen && (
          <main className="w-full h-full flex flex-col backdrop-blur-xl rounded-xl">
            <header className="flex justify-between items-center bg-gray-900 text-gray-50  p-2">
              <button
                className="p-0 bg-gray-900"
                onClick={() => setIsOpen(false)}
              >
                🡸
              </button>
              <button
                className="p-0 bg-gray-900 text-xl"
                onClick={handleNewChat}
              >
                +
              </button>
            </header>
            <section className="pb-16 pt-1 flex flex-col overflow-y-auto">
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  {item.input && (
                    <section className="user-chat flex flex-col px-5 py-1 self-end">
                      <h3 className="font-bold text-sm self-end p-1 text-purple-500">
                        You
                      </h3>
                      <p className="bg-gray-800 text-xs font-normal p-1 text-center rounded-md text-gray-200">
                        {item.input}
                      </p>
                    </section>
                  )}
                  <section className="ai-reply flex flex-col px-2 py-2 self-start">
                    <h3 className="font-bold text-sm self-start p-1 text-green-500">
                      Eco Ride
                    </h3>
                    <ReactMarkdown
                      className={`font-normal markdown p-2 text-xs text-white ${
                        item.response ===
                        '**Error generating response, Kindly retry**'
                          ? 'bg-red-600'
                          : 'bg-gray-800'
                      } rounded-md leading-relaxed`}
                      children={item.response}
                    />
                  </section>
                </React.Fragment>
              ))}
            </section>
            <form
              className="fixed bottom-7 flex w-1 mt-8 ml-12"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={input}
                className="px-2 text-gray-50 rounded-md rounded-r-none w-[30rem] focus:outline-none bg-gray-700 p-1"
                placeholder="Enter your prompt..."
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                disabled={false}
                type="submit"
                className="bg-gray-900 border border-gray-700 rounded-md rounded-l-none text-lg text-white hover:bg-gray-800 disabled:bg-gray-400"
              >
                &nbsp;➤&nbsp;
              </button>
            </form>
          </main>
        )}
        {!isOpen && (
          <button
            className="bg-gray-900 text-gray-50 p-2 rounded-lg w-[50px] h-[50px]"
            onClick={() => setIsOpen(true)}
          >
            💬
          </button>
        )}
      </div>
    </>
  )
}
