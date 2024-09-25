## 🎆🎆 Welcome! 
This project is the basic template of how to connect watcher to your p5.js sketch using http if you want to add fun computer vision interaction to your creative coding. This demo is to play fireworks effect when detecting person.

![](https://github.com/jby5122/Watcher_P5js/blob/b50e4d722dde7635ad41b7ea172ca5d6f921b8a4/watcher%20fireworks.gif)

## What is SenseCAP Watcher

- SenseCAP Watcher is an AI watcher to help you monitor anomaly within a space and then take actions, it runs with tinyML model such as simple object detections, but it also contains the power of LLM to actually understand what is captured in the camera. 
- E.g., you can ask it for just detecting human body, or you can ask if the person is smoking. Think about what fun interaction you want for your creative coding.
- After detecting what you want in the space, it can send out the message and captured image to multiple platforms, such as a desired http address for software, or through the port on the back to arduino or raspberry pi for hardware.
- More info on [kickstarter](https://www.kickstarter.com/projects/seeed/sensecap-watcher-open-source-ai-assistant-for-smarter-spaces)

## Steps to use this project
### 1 Set up watcher
Download the SenseCraft App, bind your watcher, make sure the watcher's **Wi-Fi is same as your laptop**.
Send out any task, here I choose to detect human body, but there are so many more to play with.

<img src="https://github.com/user-attachments/assets/08587eeb-c9e1-4d4a-98eb-a01bb9962074" alt="send task" width="200"/>
<img src="https://github.com/user-attachments/assets/4d37df27-9586-49ea-8a65-95d29eef19b2" alt="set action" width="200"/>

After you run the task, watcher will enter the detecting mode:

<img src="https://github.com/user-attachments/assets/5c135805-a4fd-45ae-9d55-f20d9fa7fa24" alt="set action" width="500"/>

Fun fact: You can also customize Watcher digital avatar so that the detecting face can be any animation you want.

### 2 get your laptop ip
In your terminal, type in this and locate the `en0`, then look for the `inet` Entry. It usually starts with `192.168`, `10.x`, or `172.16` to `172.31`. 
```
ifconfig 
```
### 3 enter the ip address in you watcher setting 
<img src="https://github.com/user-attachments/assets/1309f17e-f78e-430b-b932-4cfeb6fac135" alt="Description" width="200"/>
<img src="https://github.com/user-attachments/assets/e27affbe-4f5c-4d59-b4e8-87692f420d3e" alt="Description" width="200"/>

### 4 Server.js
This file runs a local server on your computer, where it will receive the message at the port number you put in. I use 3000 here, but you can change it to other port if needed. Then you can run the file in the terminal.
```
node Server.js 
```
You should see this after you run this line
> Server running on the http://localhost:3000

### 5 What is received on http
When the detection happens, watcher will send out a json like this
```

{
    "requestId": "5686b647-1a6d-4e50-8d2a-b5166a5f9c5b",
    "deviceEui": "2CF7F1C96270006A",
    "events": {
        "timestamp": 1727256084744,
        "text": "texttext",
        "img": "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABsSFBcU...AAAAA=", //the base64 image code
        "data": {
            "inference": {
                "boxes": [
                    [
                        213, //box x
                        213, //box y
                        389, //box w
                        340, //box h
                        89, //confident score
                        0   ////classes_name id
                    ]
                ],
                "classes_name": [
                    "person"
                ]
            }
        }
    }
}
```
with this json, now you can manipulate the data in whatever ways you want. In this fireworks example sketch.js, I have 
```
if (data && data.content.events.text == "play fireworks") {
      // console.log("fireworks~")
      triggerFireworks();
    }
```
Which means if watcher detects a person, then it will send out "play fireworks" text to the http. Then once this message is passed in the sketch.js, my fireworks effect will be triggered.

# What you can do
I think watcher greatly handles messy hardware and the computer vision part where one can quickly combine what is in reality with your creative coding.
  - Seeing your cat eating, pop up a cat eating particle effects on your laptop
  - If a white shirt person passes by, draw out beautiful patterns on their shirt
  - Every time an apple shows up, the apple item in your game will ++
  -...

The imagination for creative coding is unlimited, where we can focus more on what we want to deliver rather than solving technical difficulties. Communicating to watcher with our natural language is so awesome and no-code switching different models just saves lots of debugging time. 

# Others
The creative coding is based on [p5.js](https://p5js.org/). But you can choose any other platforms based on your preference. All you need is a connection between watcher, server, and your front-end behaviors. 

Inspiration platforms you might be interested:
- [OpenProcessing](https://openprocessing.org/)
- [Particles in js](https://particles.js.org/)
- [tsParticles](https://codepen.io/collection/DPOage)
- [three js](https://threejs.org/)
