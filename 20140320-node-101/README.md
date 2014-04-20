# Node.js 101

"Node.js 101" was delivered to the Grey Node Developer Group on 20 March 2014.
The presentation consisted of me talking through a deck (`node-101.pdf`) and
running a few simple demos.

If you have Node installed, all of the demos can be run from the command-line.
I ran them using a Mac, but they should work on a Windows box as well.

To run the first demo, you'll need to use the "harmony" flag:

```
node --harmony 01-harmony.js
```

The second demo(s) look at a few Node globals and how Node handles global
variables. It also involves a detour to discuss the `bind` method of
`function`.

The third demo demonstrates using a third-party module installed using `npm`.
To run it, you'll first need to install cheerio:

```
npm install cheerio
```