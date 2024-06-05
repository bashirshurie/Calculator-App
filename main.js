let  button = document.querySelectorAll("button");
let  resInput = document.querySelector("#res_input");
let  opInput = document.querySelector("#op_input");

let  histroyIcon = document.querySelector(".histroy_icon");
let  histroyPage = document.querySelector(".histroy_page");
let  histroyOperation = document.querySelector(".hsitroy_operation");

let valueOne = 0;
let valueTwo = 0;
let operation = "";
let option2 = false;

let allOperation = (JSON.parse(localStorage.getItem("operations")) || []);

showHistroy();

histroyIcon.addEventListener("click", ()=> {
    histroyPage.classList.toggle("active");

    showHistroy();

    let histroyElement = document.querySelectorAll(".histroy_element");

    histroyElement.forEach( he => {
        he.addEventListener("click", (e) => {
            
            opInput.value = e.target.parentElement.children[0].value;
            resInput.value = e.target.parentElement.children[1].value;
        })
    })
});


document.querySelector(".fa-trash").addEventListener("click", () => {
    clearHistroy();
    showHistroy();
})


button.forEach(btn => {
    btn.addEventListener("click", (e) => {

        if(btn.classList.contains("clear-all") || btn.classList.contains("clear")){
            // Clear or Clear all
            
            if(btn.classList.contains("clear")){
                if(resInput.value > 0){
                    clearInput(resInput);

                }else {
                    clearInput(opInput);
                }
            } else {
                clearAll();
            }

        } else if(btn.classList.contains("operation")){
            // Operations
            
            if(btn.value != "="){
                option2 = true;
                valueOne = opInput.value;
                operation = btn.value;
            } else{

                if(option2){

                   let sum = `${(valueOne)} ${operation} ${(valueTwo)}`
                   resInput.value = `${eval(sum)}`;

                   let currentOperation = {
                    val1 : valueOne,
                    op : operation,
                    val2 : valueTwo
                   }

                   allOperation.push(currentOperation);
                   localStorage.setItem("operations", JSON.stringify(allOperation));


                   valueOne = 0;
                   valueTwo = 0;
                   operation = "";

                }
            }

        } else {
            // Numbers

            // if I have number one, then assign me number two.
            if(option2){

                valueTwo == 0 ? valueTwo = btn.value : valueTwo += btn.value;
                opInput.value = `${valueOne} ${operation} ${valueTwo}`

            } else {

                opInput.value == 0 ? opInput.value = btn.value : opInput.value += btn.value;
            valueOne += btn.value;

            }
            
        }

    })
})

function clearInput(input){
    let currentResult = input.value.split("");

    let last = currentResult.pop();

    if(currentResult.length > 0){
        input.value = currentResult.join("");
        
    }else {
        input.value = 0;
        option2 = false;
        valueOne = 0;
        valueTwo = 0;
        operation = 0;
    }
}

function clearAll(){
    opInput.value = 0;
    resInput.value = 0;
    option2 = false;
    valueOne = 0;
    valueTwo = 0;
    operation = 0;
}

function showHistroy() {
    let ops = '';

    if(allOperation.length > 0){
        allOperation.forEach( op => {

            let current = `${(op.val1)} ${(op.op)} ${(op.val2)}`

            ops += `<div class="histroy_element">

            <input type="text" class="calc_his" value="${op.val1} ${op.op} ${op.val2}" disabled>
            <input type="text" class="calc_his" value="${eval(current)}" disabled>
        
            </div><hr>`;
        }) 

    } else {
        ops = "<h5>We don't have any Histroy</5>"
    }

    histroyOperation.innerHTML = ops;
}

function clearHistroy() {
    localStorage.clear();
    allOperation = [];
}