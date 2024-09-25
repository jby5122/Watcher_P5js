Welcome! This project is the basic template of how to connect watcher to your p5.js sketch using http if you want to add fun computer vision interaction to your creative coding. This demo is to play fireworks effect when detecting person.

## 1 What is SenseCAP Watcher

- SenseCAP Watcher is an AI watcher to help you monitor anomaly within a space and then take actions, it runs with tinyML model such as simple object detections, but it also contains the power of LLM to actually understand what is captured in the camera. 
- E.g., you can ask it for just detecting human body, or you can ask if the person is smoking. Think about what fun interaction you want for your creative coding.
- After detecting what you want in the space, it can send out the message and captured image to multiple platforms, such as a desired http address for software, or through the port on the back to arduino or raspberry pi for hardware.

## 2 Steps to use this project
### 2.1 Set up watcher
Download the SenseCraft App, bind your watcher, set the Wi-Fi to be the same as your laptop


<img src="https://github.com/user-attachments/assets/1309f17e-f78e-430b-b932-4cfeb6fac135" alt="Description" width="500"/>


![wecom-temp-186122-ec0ec7a33dd1178a6a9b48c4b323899e](https://github.com/user-attachments/assets/e27affbe-4f5c-4d59-b4e8-87692f420d3e)


### 2.2 get your laptop ip
In your terminal, type in this and locate the `en0`, then look for the `inet` Entry. It usually starts with `192.168`, `10.x`, or `172.16` to `172.31`. 
```
ifconfig 
```
### 2.3 enter the ip address in you watcher setting 
[insert images here]

### 2.4 Server.js
This file runs a local server on your computer, where it will receive the message at the port number you put in. I use 3000 here, but you can change it to other port if needed. Then you can run the file in the terminal.
```
node Server.js 
```
You should see this after you run this line
> Server running on the http://localhost:3000

### 2.5 What is received on http
When the detection happens, watcher will send out a json like this
```
received POST data: {
  requestId: '968dc122-cd29-4db9-xxxx-a8dd0a85ecb4',
  deviceEui: '2CF7F1C9xxxxxx6A',
  events: {
    timestamp: 1727232562287,
    text: 'Two hands',
    img: '/9j/4AAQSkZJRgABAQE... //the base64 image code)
    data://this only shows up if you are using a tinyML model where it will draw out the detection box around the object
      inference: 
        boxes:
          0: 
            [86, //box x
            228, //box y
            173, //box w
            234, //box h
            90, //confident score
            0] //classes_name id
        classes_name:
          0: "human"
          1: "dog"
          2: "cat"
```
with this json, now you can manipulate the data in whatever ways you want. In this fireworks example sketch.js, I have 
```
if (data && data.content.events.text == "play fireworks") {
      // console.log("fireworks~")
      triggerFireworks();
    }
```
Which means if watcher detect a person, then it will send out "play fireworks" text to the http. Then once this message is passed in the sketch.js, my fireworks effect will be trigger.

# What you can do
I think watcher greatly handles messy hardware and the computer vision part where one can quickly combine what is in reality with your creative coding.
  - Seeing your cat eating, pop up a cat eating particle effects on your laptop
  - If a white shirt person passes by, draw out beautiful patterns on their shirt
  - Every time an apple shows up, the apple item in your game will ++
  -...

The imagination for creative coding is unlimited, where we can focus more on what we want to deliver rather than solving technical difficulties. Communicate to watcher with our nature language is so awesome and no code switching different models just save lots of debugging time. 
