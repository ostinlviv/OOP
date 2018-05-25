class SuperUser {
    constructor (name, sex, birth, address, phone, email) {
        this.name = name;
        this.sex = sex;
        this.birth = birth;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.isDataVisible = true;
    }
    changeDataVisibility(){
        if (this.isDataVisible === false) {
            this.isDataVisible = true;
        } else if (this.isDataVisible === true) {
            this.isDataVisible = false;
        }
    }
}

class User extends SuperUser {
    constructor (name, sex, birth, address, phone, email) {
        super(name, sex, birth, address, phone, email);
        this.isDataVisible = false;
    }

    render() {
        const save = document.getElementById("users");
        let rowsNum = save.rows.length;
        if (rowsNum > 0){
            for(let i = 1; i < rowsNum; i++){
                save.deleteRow(1);
            }
        }
        for (let i = 0; i < db.length; i++){
            const tr = document.createElement('tr');
            tr.classList.add("userTr");
            tr.setAttribute("id", i);
            const tdName = document.createElement('td');
            const tdSex = document.createElement('td');
            const tdBirth = document.createElement('td');
            const tdAddress = document.createElement('td');
            const tdPhone = document.createElement('td');
            const tdEmail = document.createElement('td');
            tdName.innerHTML = db[i]['name'];
            tdSex.innerHTML = db[i]['sex'];
            tdBirth.innerHTML = db[i]['birth'];
            tdAddress.innerHTML = db[i]['address'];
            tdPhone.innerHTML = db[i]['phone'];
            tdEmail.innerHTML = db[i]['email'];
            if (db[i]['isDataVisible'] === true){
                tr.appendChild(tdName);
                tr.appendChild(tdSex);
                tr.appendChild(tdBirth);
                tr.appendChild(tdAddress);
                tr.appendChild(tdPhone);
                tr.appendChild(tdEmail);
            } else if (db[i]['isDataVisible'] === false){
                tr.appendChild(tdName);
            }

            save.appendChild(tr);

            tr.addEventListener('click', () => {
                db[i].changeDataVisibility();
                this.render();
            });
        }
    }
}


const db = [];

const saveBtn = document.querySelector('.addUser');
saveBtn.addEventListener('click', function() {
    const getName = document.querySelector('#name').value;
    const getSex = document.querySelector('#sex').value;
    const getBirth = document.querySelector('#birth').value;
    const getAddress = document.querySelector('#address').value;
    const getPhone = document.querySelector('#phone').value;
    const getEmail = document.querySelector('#email').value;
    const getType = document.querySelector('#visibility').value;
    if (getName === '' || getBirth === '' || getAddress === '' || getPhone === '' || getEmail === '') {
        alert("Please, fill in all fields");
    } else {
        if (getType === "User") {
            const user = new User(getName, getSex, getBirth, getAddress, getPhone, getEmail);
            db.push(user);
            user.render();
        } else if (getType === "SuperUser") {
            const superUser = new SuperUser (getName, getSex, getBirth, getAddress, getPhone, getEmail);
            db.push(superUser);
            superUser.render();
        }

    }
});







