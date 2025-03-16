# Health at Home x Bangkok University
ยินดีต้อนรับสู่โปรเจกต์นี้! ที่นี่เราจะมาเรียนรู้และทดลองใช้งาน LINE Platform สองส่วนสำคัญ ได้แก่ LIFF เบื้องต้น และ LINE Messaging API ที่เชื่อมต่อกับ Gemini โปรเจกต์นี้เหมาะสำหรับผู้เริ่มต้นที่ต้องการทำความเข้าใจและพัฒนาแอปพลิเคชันบน LINE Platform

# Table of Content
* [สิ่งที่ต้องเตรียมก่อนเริ่มเรียนรู้](#สิ่งที่ต้องเตรียมก่อนเริ่มเรียนรู้)
* [Slide ประกอบการสอน](#slide-ประกอบการสอน)
* [เริ่มต้นกันเถอะ](#เริ่มต้นกันเถอะ)
* [LINE Front-end Framework (LIFF)](#line-front-end-framework-liff)
* [Messaging API with Gemini](#messaging-api-with-gemini)
* [Link Reference](#link-reference)
* [Note](#note)

<br><br>

# สิ่งที่ต้องเตรียมก่อนเริ่มเรียนรู้
1. **Line Developer Account** (https://developers.line.biz/console/)
    - บัญชีนี้จำเป็นสำหรับการสร้างและจัดการ Provider และ Channel ของตัวเอง (มันคืออะไรนั้น Slide มีระบุไว้ให้แล้ว) ให้ทำการสมัครบัญชีสำหรับ Devloper ให้เรียบร้อย

2. **AI Studio สำหรับ Gemini** (https://aistudio.google.com/welcome)
    - ใช้สำหรับเข้าถึงและใช้งาน Gemini API 

3. **โปรแกรม VS Code หรือโปรแกรม Text Editor ที่ถนัด**
    - คำแนะนำ: สามารถติดตั้ง Extension ที่จำเป็นสำหรับการพัฒนา Node.js และ JavaScript เพื่อความสะดวกสบายในการพัฒนาระบบมากขึ้น

4. **Node (LTS) / npm, yarn, bun, … หรือ เครื่องมือในการจัดการกับ package ของ Node.js ที่ถนัด** (https://nodejs.org/en)
    - Node.js เป็น Runtime Environment สำหรับรัน JavaScript บน Server-side
    - npm, yarn, และ bun เป็น Package Managers สำหรับจัดการ dependencies ของโปรเจกต์ Node.js (ใช้ได้ตามถนัด แต่ถ้าสำหรับผู้เริ่มต้นแนะนำเป็น npm)
    - ติดตั้ง Node.js เวอร์ชัน LTS (Long Term Support) เพื่อความเสถียรในการใช้งาน

5. **Ngrok** (https://ngrok.com/)
    - เนื่องจาก webhook ของเราต้องเป็น https ดังนั้นจึงใช้ Ngrok สำหรับสร้าง Tunneling หรือทางเชื่อมเพื่อให้ Webhook สามารถเข้าถึง Local Server ของคุณได้
    - สร้าง Account Ngrok และติดตั้ง Ngrok CLI ให้เรียบร้อยตามวิธีการในเว็บไซต์ได้เลย

<br>

# Slide ประกอบการสอน
> จะตามมาภายหลังนะ 🤫

<br>

# เริ่มต้นกันเถอะ
การเริ่มต้นนั้น ทางพวกเราได้เตรียม Code เริ่มต้นของ Project เอาไว้ให้เรียบร้อยแล้ว มาทำการโหลดและติดตั้งกันเถอะ
### *ขั้นตอนที่ 1:* ดาวน์โหลด Project
- ทำการ Clone หรือ Download ZIP ของ Repository นี้ลงคอมพิวเตอร์ของตัวเอง

### *ขั้นตอนที่ 2:* สร้าง Provider / LINE Login Channel / Messsaging API Channel
- สามารถสร้างได้ที่ https://developers.line.biz/console/
- สำหรับ LIFF ใน LINE Login Channel สามารถใส่ link ของอะไรก็ได้เข้าไปใน Endpoint URL
- สำหรับ Messsaging API Channel ต้องทำการสร้าง LINE OA ก่อน จากนั้นเปิดการใช้งาน Messsaging API ผ่าน LINE OA ผ่านเมนู Setings

### *ขั้นตอนที่ 3:* Set up Environment ของ Project
- สำหรับ LIFF ไปที่ [สิ่งที่ต้องเตรียมก่อน](#สิ่งที่ต้องเตรียมก่อน)
- สำหรับ Messaging API ให้ดูที่ข้อสุดท้ายของ [วิธีการเรียนรู้](#วิธีการเรียนรู้)
- สำหรับตำแหน่งของค่าต่าง ๆ จะมีระบุใน slide การสอน


### *ขั้นตอนที่ 4:* Install package
- ขั้นกับแต่ละคนจะใช้อะไรนะ แต่ตัวอย่างของใช้เป็น npm 
``` bash
npm install
```

### *ขั้นตอนที่ 5:* Ngrok
- ทำการรัน command ข้างล่างเพื่อเริ่มใช้งาน webhook 
``` bash
ngrok http 3000
```
- `{https_link}` คือ link ที่เป็น https ที่จากการรัน ngrok โดยจะอยู่ในบรรทัด Forwarding
- นำ `{https_link}` ที่ได้ไปสร้าง LIFF ใน LINE Login Channel
- นำ `{https_link}/webhook` ที่ได้ไปใส่ใน Messaging API Channel จากนั้นติ๊กเปิดใช้งาน webhook ในหัวข้อ Use webhook

<br>

ถ้าทำการลงอะไรเสร็จแล้ว ทีนี้ก็เรียบร้อย ได้เวลามาเริ่มกันเถอะ !!

<br>

# LINE Front-end Framework (LIFF)
เราจะไม่สนใจส่วนไหนเลย นอกจากไฟล์ [index.html](/liff/index.html) เท่านั้น<br>
doc reference: https://developers.line.biz/en/reference/liff/ 

### สิ่งที่ต้องเตรียมก่อน
``` javascript
await liff.init({ liffId: '<YOUR_LIFF_ID>' })
```
*<YOUR_LIFF_ID>* ใส่ LIFF ID ของ ตัวเองเข้าไป

### 💡 สิ่งที่จะได้เรียนรู้
- LIFF ต่างจากเว็บไซต์ปกติทั่วไปอย่างไร
- LIFF ทำอะไรได้บ้าง
- LIFF จะสามารถนำ LIFF ไปประยุกต์ใช้กับธุรกิจหรือระบบอะไรได้บ้าง

<br>

# Messaging API with Gemini
เราจะสนใจ code ในส่วนของ [Folder webhook](/webhook) เท่านั้น<br>
doc reference: https://developers.line.biz/en/reference/messaging-api/#message-event

### วิธีการเรียนรู้
- ลำดับการเขียน code มี comment ไว้เป็นขั้นตอน ๆ ตั้งแต่ 0 จนถึง 4 ซึ่งแต่ละหัวข้อจะมี Task ย่อยอยู่และกำกับจุดประสงค์เอาไว้ชัดเจน
- อย่าลืม set .env file ก่อนเริ่ม run project

### 💡 สิ่งที่จะได้เรียนรู้
- Webhook ของ LINE ทำงานยังไง
- เราทำการตอบกลับข้อความลูกค้าผ่าน LINE ยังไง
- ทำการ Integrate AI เข้ากับ Chat Bot เรายังไงได้บ้าง

<br>
<br>

# Link Reference
| No. | Description            | Link                                                                  |
| --- | ---------------------- | --------------------------------------------------------------------- |
| 0 | Line API Product         | https://linedevth.line.me/th/                                         |
| 1 | Line Devloper Console    | https://developers.line.biz/console/                                  |
| 2 | AI Studio for Gemini     | https://aistudio.google.com/welcome                                   |
| 3 | Node (LTS version) + npm | https://nodejs.org/en                                                 |
| 4 | Ngrok                    | https://ngrok.com/                                                    |
| 5 | LIFF                     | https://developers.line.biz/en/docs/liff/overview/                    |
| 6 | Messaging API            | https://developers.line.biz/en/docs/messaging-api/overview/           |
| 7 | Webhook                  | https://developers.line.biz/en/reference/messaging-api/#message-event |
| 8 | Message Type             | https://developers.line.biz/en/docs/messaging-api/message-types/      |
| 9 | Flex Simmulator          | https://developers.line.biz/flex-simulator/                           |

<br>
<br>

# Note
- สำหรับคนที่ตาม code ไม่ทันสามารถดูเฉลยของ code ทั้งหมดได้ที่ branch answer < ซึ่งจะตามมาภายหลัง 🤫 >
