const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Настройка парсинга JSON
app.use(bodyParser.json());
app.use(express.static('public'));  // Для статики (HTML, CSS, JS)

// Эндпоинт для запуска кода
app.post('/run-cpp', (req, res) => {
    const { code } = req.body;

    // Сохраняем код в файл
    const fs = require('fs');
    const filename = 'user_code.cpp';
    fs.writeFileSync(filename, code);

    // Компилируем и запускаем C++ код
    exec(`g++ ${filename} -o user_code && ./user_code`, (err, stdout, stderr) => {
        if (err) {
            res.json({ success: false, error: stderr });
        } else {
            res.json({ success: true, output: stdout });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
