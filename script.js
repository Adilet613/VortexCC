async function runCode() {
    const code = document.getElementById("cpp-code").value;

    if (code.trim() === "") {
        alert("Пожалуйста, введите код!");
        return;
    }

    // Отправка кода на сервер для компиляции
    const response = await fetch('/run-cpp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    });

    const result = await response.json();

    // Отображение результатов
    if (result.success) {
        document.getElementById("output").textContent = result.output;
    } else {
        document.getElementById("output").textContent = "Ошибка компиляции:\n" + result.error;
    }
}
