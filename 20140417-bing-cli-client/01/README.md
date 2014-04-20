# Bing CLI client step one

The first step in starting a new Node project is to create a few subsidiary
files.

The first, and probably the least important, is `.gitattributes`. I always add
a .gitattributes to every project with the following line:

`* text=auto`

This ensures that line endings are normalized. From [Stack Overflow](https://stackoverflow.com/questions/21472971/what-is-the-purpose-of-text-auto-in-gitattributes):

> When text is set to "auto", the path is marked for automatic end-of-line
> normalization. If git decides that the content is text, its line endings are
> normalized to LF on checkin.

> If you want to interoperate with a source code management system that
> enforces end-of-line normalization, or you simply want all text files in your
> repository to be normalized, you should instead set the text attribute to
> "auto" for all files.

> This ensures that all files that git considers to be text will have
> normalized (LF) line endings in the repository.

The second file is a `.gitignore`, which is used to avoid project-level files
and directories. OS-specific and editor-specific files should be ignored using
a "[global ignore](https://help.github.com/articles/ignoring-files)" that
applies to all repositories on your system.

For a Node project, the following almost always makes sense:

    # NPM generated files
    node_modules
    npm-debug.log

Finally, we need a `package.json`. I spent most of the time on step one
discussing this file, but I don't feel like typing up definitions of the fields
when there are two excellent existing resources:

* The [npm package.json "man" page](https://www.npmjs.org/doc/json.html)
* The [package.json cheatsheet](http://package.json.nodejitsu.com/)