"""Draw an original editorial postcard, not a gameplay screenshot."""
from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
im=Image.new('RGB',(1200,630),'#102b35');d=ImageDraw.Draw(im)
font=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n)
serif=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',n)
d.text((58,48),'F / C     A GIFT FROM 2058',font=font(17),fill='#c6fb7b')
d.text((58,142),'Build a city.',font=serif(56),fill='#eff4e3');d.text((58,212),'Leave a letter.',font=serif(56),fill='#eff4e3')
d.text((62,330),'A small island. Someone you love.',font=font(22),fill='#b5d0d0');d.text((62,370),'A future shaped by your choices.',font=font(22),fill='#b5d0d0')
d.rounded_rectangle((58,475,366,534),radius=28,fill='#c6fb7b');d.text((88,492),'OPEN YOUR GIFT',font=font(19),fill='#102b35')
d.text((60,583),'FUTURE CITY  /  TRIPOTHON S1',font=font(14),fill='#94b9bb')
def pt(x,z,y=0):return (int(867+(x-z)*31),int(360+(x+z)*15-y*38))
def poly(points,c):d.polygon(points,fill=c)
poly([pt(-4,-4),pt(4,-4),pt(4,4),pt(-4,4)],'#9bbda0')
poly([pt(-4,4),pt(4,4),pt(4,4,-.7),pt(-4,4,-.7)],'#476d70')
poly([pt(4,-4),pt(4,4),pt(4,4,-.7),pt(4,-4,-.7)],'#668681')
def block(x,z,w,h,c):
 poly([pt(x,z),pt(x+w,z),pt(x+w,z,h),pt(x,z,h)],c)
 poly([pt(x+w,z),pt(x+w,z+w),pt(x+w,z+w,h),pt(x+w,z,h)],'#a5bba4')
 poly([pt(x,z,h),pt(x+w,z,h),pt(x+w,z+w,h),pt(x,z+w,h)],'#e6dfbd')
for x,z,h,c in [(-2.8,-2.5,1.4,'#d6b69d'),(-.9,-2.4,2,'#bbcfb8'),(1.4,-2.3,1.6,'#dfcba7'),(-.6,0,2.5,'#e0cb9f')]:block(x,z,.9,h,c)
for x,z in [(-2.8,1),(-2,2.8),(.6,2.8),(2.7,.5),(2.5,2.6)]:
 a,b=pt(x,z);d.line((a,b,a,b-42),fill='#a28568',width=6);d.ellipse((a-21,b-70,a+21,b-26),fill='#83b987')
for i in range(4):
 x,y=pt(-1+i*.7,2);d.line((x,y,x+18,y+9),fill='#e7dab7',width=4)
d.text((765,534),'Illustrated gift postcard',font=font(13),fill='#96b8b8')
im.save(Path(__file__).resolve().parents[1]/'dist/og-image.png',optimize=True)
