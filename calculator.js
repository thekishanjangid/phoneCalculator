
let string = '';
let inputElement = document.getElementById("input");
let historyElement = document.getElementById("myelememnt");

document.querySelectorAll(".item").forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML === "=") {
            try {
                let oldString = string;
                string = eval(string);

                if (isNaN(string) || !isFinite(string)) {
                    throw new Error('Invalid input');
                }

                let calculated = string;

                // Update history
                let getData = localStorage.getItem('history') || '[]';
                let parsedGetData = JSON.parse(getData);
                let all = `${oldString}=${calculated}`;
                const mydata = parsedGetData.concat(all);

                // Update history element
                historyElement.innerHTML = '';
                mydata.forEach(item => {
                    const li = document.createElement("div");
                    li.textContent = item;
                    historyElement.appendChild(li);
                });

                localStorage.setItem("history", JSON.stringify(mydata));
                inputElement.value = string;
            } catch (error) {
                string = 'Error';
                inputElement.value = string;
            }
        } else if (e.target.innerHTML === "AC") {
            string = "";
            inputElement.value = string;
        } else {
            string = string + e.target.innerHTML;
            inputElement.value = string;
        }
    });
});