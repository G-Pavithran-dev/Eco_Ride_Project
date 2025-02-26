# image-reader.py
import easyocr
import cv2
import sys
from PIL import Image, ImageDraw

def draw_boxes(image, bounds, color='black', width=2):
    draw = ImageDraw.Draw(image)
    for bound in bounds:
        p0, p1, p2, p3 = bound[0]
        draw.line([*p0, *p1, *p2, *p3, *p0], fill=color, width=width)
    return image

def recognize_text(image_path):
    reader = easyocr.Reader(['en'], gpu=True)
    im = Image.open(image_path)
    bounds = reader.readtext(im)

    draw_boxes(im, bounds)
    im.save("output.jpg")
    
    for bound in bounds:
        print(bound[1])

if __name__ == "__main__":
    image_path = sys.argv[1]
    print(f"Reading text from {image_path}")
    recognize_text(image_path)