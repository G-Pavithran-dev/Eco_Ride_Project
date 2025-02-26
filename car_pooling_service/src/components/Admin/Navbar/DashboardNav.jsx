import { Button } from '../../ui/button'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

function DashboardNav() {
  return (
    <nav className="w-screen shadow-lg h-16 flex flex-row justify-between items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="m-2 ml-8 w-4 h-8">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Admin Dashboard</SheetTitle>
            <SheetDescription>Take over the control</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 h-5/6"></div>
          <SheetFooter>
            <SheetClose asChild>
              <Button>Logout</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <section className="logo">
        <img src="/images/eco-ride-dash.png" className="w-24" />
      </section>
      <section className=""></section>
    </nav>
  )
}
export default DashboardNav