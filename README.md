# Voice Copter

This is a Node.js program to control a Parrot Mambo drone.
Developed on Feb 23rd, 2018, by Nicolas Baissas, Gianluca Bargelli, Aaron Stillwell and Adrien Joly during [HackCopter '18](https://github.com/algolia/hackcopter) (drone hackathon organized during Algolia's offsite).

## Demo

[![VoiceCopter demo video ("Russian roulette" drone program)
](https://img.youtube.com/vi/I8_ItUvsmnQ/0.jpg)](https://www.youtube.com/watch?v=I8_ItUvsmnQ)

## Usage

This has been tested on macOS High Sierra. Use at your own risk!

0. Clone this repo, then `npm install` (requires Node.js)
1. Edit the drone's id in `server.js` (e.g. `Team13`)
2. Activate bluetooth on your computer
3. Put the drone on the floor, with enough space around
4. Install the minigun on the drone
5. Put a charged battery into the drone, turn it on
6. Run `npm start`
7. From http://localhost:3000 (voice command UI), click "record" then say "take off" (or any order)
8. When the drone is in "russian roulette" mode, clap your hands to make the drone shoot!

In case your drone is stuck because you forgot to land it or if there's any other issue
and you want to stop the drone, just run "node stop.js".
