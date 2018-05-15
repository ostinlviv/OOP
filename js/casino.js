class Casino {
    constructor (smQty, money) {
        this.smQty = smQty;
        this.money = money;
        this.sm = [];
    }

    newSM(){
        let rand = 0 - 0.5 + Math.random() * (this.smQty + 1);
        rand = Math.round(rand);
        for(let i = 0; i < this.smQty; i++) {
            this.sm.push(new SlotMachine(this.money/this.smQty));
            this.sm[i]['number'] = i + 1;
            if (i === rand) {
                this.sm[i]['isLucky'] = true;
            }
        }
        console.log('You have just created ' + this.smQty + ' SlotMachine(s).');
    }

    getMoney() {
        console.log('Your casino have ' + this.money + ' $.');
        return this.money;
    }

    getSmQty() {
        console.log('Your casino have ' + (this.sm.length)  + ' SlotMachine(s).');
        return this.sm.length;
    }

    add() {
        let max = 0;
        let maxi = 0;
        for(let i = 0; i < this.sm.length; i++) {
            if (this.sm[i]['money'] > max) {
                max = this.sm[i]['money'];
                maxi = i;
            }
        }
        this.sm[maxi]['money'] = this.sm[maxi]['money'] - this.sm[maxi]['money']/2;
        this.sm.push(new SlotMachine(max/2));
        this.sm[this.sm.length-1]['number'] = this.sm.length;
        console.log('You have just created new SlotMachine and put ' + this.sm[maxi]['money'] + ' $ from SlotMachine ' + (maxi+1));
    }

    del(number) {
        if (this.sm.length <= 0) {
            console.log('You do not have SlotMachines.');
        } else if ((number > this.sm.length) || (number < 0)) {
            console.log('You do not have SlotMachine ' + number);
        } else {
            let money = this.sm[number-1]['money'] / (this.sm.length - 1);
            this.sm.splice(number-1,1);
            for(let i = 0; i < this.sm.length; i++) {
                this.sm[i].money = this.sm[i].money + money;
            }
            console.log('You have just deleted SlotMachine ' + number);
        }
    }

    getMoneyBack(amount) {
        let initialAmount = amount;
        function compare(smA, smB) {
            return smB.money - smA.money;
        }
        this.sm.sort(compare);
        for(let i = 0; i < this.sm.length; i++) {
            if (this.sm[i].money > amount) {
                this.sm[i].money = this.sm[i].money - amount;
                console.log('You get back ' + initialAmount + ' $.');
                return initialAmount;
            } else if (this.sm[i].money < amount) {
                let x = this.sm[i].money;
                this.sm[i].money = this.sm[i].money - x;
                amount = amount - x;
            }
        }
    }
}

class SlotMachine {
    constructor (money) {
        this.money = money;
        this.number = null;
        this.isLucky = false;
    }

    getCurrentMoney() {
        console.log('This SlotMachine have ' + this.money + ' $.');
        return this.money;
    }

    getMoneySM(amount) {
        if (this.money >= amount) {
            this.money = this.money - amount;
            console.log('You get ' + amount + ' $.');
            casino.money = casino.money - amount;
        } else {
            console.log('You can not get this sum.');
        }
    }

    addMoneySM(amount) {
        this.money = this.money + amount;
        casino.money = casino.money + amount;
        console.log('You have just add ' + amount + ' $.');
    }

    play(amount) {
        if (casino.money === 0){
            console.log('Sorry, our Casino is bankrupt');
        } else if (this.money === 0){
            console.log('Sorry, this SlotMachine have not money.');
        } else {
            console.log('You have just add ' + amount + ' $ and play --->');
            this.money = this.money + amount;
            casino.money = casino.money + amount;
            let rand = 100 - 0.5 + Math.random() * (999 - 100 + 1);
            rand = Math.round(rand);
            if((rand.toString()[0] === rand.toString()[1]) || (rand.toString()[1] === rand.toString()[2]) || (rand.toString()[0] === rand.toString()[2])) {
                amount = amount*2;
                this.money = this.money - amount;
                console.log('~~~ ' + rand + ' ~~~');
                console.log('You win ' + amount + ' $.');
            }
            else if(rand.toString()[0] === rand.toString()[1] === rand.toString()[2]) {
                amount = amount*5;
                this.money = this.money - amount;
                console.log('~~~ ' + rand + ' ~~~');
                console.log('You win ' + amount + ' $.');
            }
            else if((rand === 777) || (this.isLucky === true)) {
                amount = this.money;
                this.money = 0;
                console.log('~~~ ' + 777 + ' ~~~');
                console.log('You win ' + amount + ' $.');
            }
            else {
                console.log('~~~ ' + rand + ' ~~~');
                console.log('You do not win.');
            }
        }
    }
}

const casino = new Casino(10,1000);
casino.newSM();
casino.add();
casino.getMoney();
casino.getSmQty();
casino.del(3);
casino.getMoneyBack(11);
casino.sm[1].getCurrentMoney();
casino.sm[1].getMoneySM(1);
casino.sm[1].getCurrentMoney();
casino.getMoney();
casino.sm[1].addMoneySM(1);
casino.sm[1].getCurrentMoney();
casino.getMoney();
casino.sm[1].play(10);

module.exports = {
    test:test
};