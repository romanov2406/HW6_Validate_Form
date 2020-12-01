let regExpName = /^[a-zA-Z]{3,15}$/;
let regExpPassword = /^[a-zA-Z0-9]{8,15}$/;
let regExpEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const signUp = document.querySelector('#btn_sign_up');
const signIn = document.querySelector('#btn_sign_in');
const test = document.querySelector('.test');

let link = document.querySelector("#link");
let link2 = document.querySelector("#link2");

function changeSelector(selector) {
    [document.querySelector('.container'),
        document.querySelector('.content')
    ].forEach(elem => elem.style.display = 'none');
    selector.style.display = 'block';
}
link.addEventListener('click', () => changeSelector(document.querySelector('.content')));
link2.addEventListener('click', () => changeSelector(document.querySelector('.container')));

const form1 = document.forms.form1;
const form2 = document.forms.form2;

form1.name.addEventListener('input', () => validateField(regExpName, form1.name, document.querySelector('.info1')));
form1.surrname.addEventListener('input', () => validateField(regExpName, form1.surrname, document.querySelector('.info2')));
form1.email.addEventListener('input', () => validateField(regExpEmail, form1.email, document.querySelector('.info3')));
form1.password.addEventListener('input', () => validateField(regExpPassword, form1.password, document.querySelector('.info4')));

let validateField = (regExp, input, selector) => {
    if (!regExp.exec(input.value)) {
        input.style.border = '1px solid red';
        input.style.marginBottom = '0px';
        selector.style.display = 'flex';
    } else {
        input.style.border = '1px solid green';
        input.style.marginBottom = '20px';
        selector.style.display = 'none';
    }
};

function zurueck() {
    test.style.display = 'none';
    document.querySelector('.content').style.display = 'block';


}

function createAndPush(id, name, surrname, email, password) {
    const newMark = new User(id, name, surrname, email, password);
    allUsers.push(newMark);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    form1.reset();
}

class User {
    constructor(id, name, surrname, email, password) {
        this.id = id;
        this.name = name;
        this.surrname = surrname;
        this.email = email;
        this.password = password;
    }
}

let allUsers = [];
signUp.addEventListener('click', function () {
    const name = form1.name.value;
    const surrname = form1.surrname.value;
    const email = form1.email.value;
    const password = form1.password.value;
    if (name !== '' && surrname !== '' && email !== '' && password !== '') {
        if (localStorage.length > 0 && localStorage.getItem('allUsers')) {
            allUsers = JSON.parse(localStorage.getItem('allUsers'));
            if (allUsers.some(elem => elem.email.toLowerCase() === email.toLowerCase())) {
                alert('Email alredy Exist');
            } else {
                const id = allUsers.slice(-1)[0].id + 1;
                createAndPush(id, name, surrname, email, password);
            }
        } else {
            createAndPush(1, name, surrname, email, password);
        }
    } else {
        alert('Заповніть всі Поля');
    }
    console.log(allUsers);
});

signIn.addEventListener('click', function () {
    allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    const email = form2.email.value;
    const password = form2.password.value;

    if (email && password) {
        const user = allUsers.find(elem => elem.email === email && elem.password === password);

        if (user) {
            test.innerHTML = `<img class="img" src="https://i.dlpng.com/static/png/6728153_preview.png" alt=""><h1>${user.name} ${user.surrname}</h1><p>${user.email}</p><h4>Designer and Web Dev</h4><button id="checkOut" onclick="zurueck()">Sign Up</button>`;
            document.querySelector('.content').style.display = 'none';
            test.style.display = 'block'
            form2.reset();
        } else {
            alert('Email or password is incorrect');
        }
    } else {
        alert('Заповніть всі поля');
    }
});