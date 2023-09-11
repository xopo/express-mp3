rsync -avhP ./ n3:/web/express-mp3/ --exclude node_modules --exclude '*.json' --exclude 'dist' #--exclude mp3sqlite.db --exclude '*.mp3' --exclude '*.webp'
ssh n3 "cd /web/salem && npm run build"
