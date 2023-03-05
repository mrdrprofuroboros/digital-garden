cd /opt/FamilyTree
git pull

cd /opt/digital-garden
rm -rf posts
mkdir posts

cp -R ../FamilyTree/* posts
rm -rf posts/☁️\ Облако posts/⚙️\ Шаблоны posts/✅\ План.md posts/📆\ Календарь.md
docker build -t obsidian-wiki .

cd /opt/photoprism
docker-compose up -d
