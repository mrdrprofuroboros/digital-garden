## What is MindStone?
MindStone is a free open-source alternative solution to [Obsidian Publish](https://obsidian.md/publish)

Here how it look like once published, checkout [demo version](https://mindstone.tuancao.me/) here:

![](public/images/CleanShot%202022-04-20%20at%2008.34.17@2x.png)

This website include a published version of default Obsidian Help vault, See it in action here 

**MindStone features:**

-  ✅ **Drop-in** support for (default) **Obsidian Vault** 
-  ✅ `[[Wiki Link]]` built-in support
-  ✅ **Folder-base** navigation side bar
-  ✅ Backlink support out of the box
-  ✅ Interactive Graph view 
-  ✅ **Easy to deploy** to Netlify, Vercel...

## Getting started
### Run on your local machine

Steps to run it on your local machine:
1. Clone this [Github repo](https://github.com/TuanManhCao/digital-garden)
2. Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) package manager 
3. Copy all of your **markdown** file (`.md` only) and folder to `/posts/` **except** `/posts/index.md` file
4. Copy all of your images from your Obsidian Vault to `/public/images/` folder 
5. Go to root folder of your project, run `yarn && yarn run dev`
6. Open this link in your browser http://localhost:3000/ 

If you prefer video content have a look at my 📺 [walk through video](https://youtu.be/7_SmWA-_Wx8)

### Publish to the internet

Setup environment (with Netlify)
1. Create your Github account and clone [my repository](https://github.com/TuanManhCao/digital-garden)
2. Create Netlify account and follow [this instruction](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/) 


Your normal workflow for publishing content, after initial setup is:
1. Simply writing your content in Obisidian (or your favourite Markdown editor)
2. Commit your changes and Push it to your Github repo

If you prefer video content, watch my 📺 [walk through video](https://youtu.be/n8QDO6l64aw) here 

## Future development 

These are just some basic features for MindStone v1, many more are coming (if I find enough of interest and this will probably a premium/paid option):
- 🎯 Obsidian, Notion, VSCode Plugin 
- 🎯 Page Preview (like Obsidian Core plugin)
- 🎯 Andy Sliding pane
- 🎯 Full text search with `Cmd + K`
- 🎯 Infinite canvas for browsing through notes and connections

### Some know issues
This an early version of MindStone, which mean there are bugs and issues. Below are some known issues, that I plan to work on:
- Graphview does not load when clicking on side-bar or click node on graphview, browser reload will refresh it state
- Graph view layout and interaction is still very rough. More UI/UX improvements are needed.
- Transclusion is not working yet.

### Deployment

#### build
```
ssh photoprism

cd /opt/FamilyTree
git pull

cd /opt/digital-garden
git pull

rm -rf posts
mkdir posts

cp -R ../FamilyTree/* posts
rm -rf posts/☁️\ Облако posts/⚙️\ Шаблоны posts/✅\ План.md posts/📆 Календарь.md
docker build -t obsidian-wiki .
```

#### test
```
docker run -p 3000:3000 obsidian-wiki
```

#### deploy
```
cd ../photoprism
docker-compose up -d
```
