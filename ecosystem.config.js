module.exports = {
    apps: [{
        name: 'mp3-express',
        script: "npm start",
        watch: ["dist"],
        // Delay between restart
        watch_delay: 1000,
        ignore_watch : ["node_modules", "stuff", "\\.git", "*.log", "*.json", "*.mp3", "*.webp"],
        env: {
            "PORT": 3034,
        }
    }]
}