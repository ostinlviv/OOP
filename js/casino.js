class Casino {
    constructor (slotMachineQuantity, money) {
        this.slotMachineQuantity = slotMachineQuantity;
        this.money = money;
        this.slotMachine = [];
    }

    newSlotMachine(){
        let rand = 0 - 0.5 + Math.random() * (this.slotMachineQuantity + 1);
        rand = Math.round(rand);
        for(let i = 0; i < this.slotMachineQuantity; i++) {
            this.slotMachine.push(new SlotMachine(this.money/this.slotMachineQuantity));
            this.slotMachine[i]['number'] = i + 1;
            if (i === rand) {
                this.slotMachine[i]['isLucky'] = true;
            }
        }
        console.log('You have just created ' + this.slotMachineQuantity + ' SlotMachine(s).');
    }

    getMoney() {
        console.log('Your casino have ' + this.money + ' $.');
        return this.money;
    }

    getSlotMachineQuantity() {
        console.log('Your casino have ' + (this.slotMachine.length)  + ' SlotMachine(s).');
        return this.slotMachine.length;
    }

    add() {
        let max = 0;
        let maxi = 0;
        for(let i = 0; i < this.slotMachine.length; i++) {
            if (this.slotMachine[i]['money'] > max) {
                max = this.slotMachine[i]['money'];
                maxi = i;
            }
        }
        this.slotMachine[maxi]['money'] = this.slotMachine[maxi]['money'] - this.slotMachine[maxi]['money']/2;
        this.slotMachine.push(new SlotMachine(max/2));
        this.slotMachine[this.slotMachine.length-1]['number'] = this.slotMachine.length;
        console.log('You have just created new SlotMachine and put ' + this.slotMachine[maxi]['money'] + ' $ from SlotMachine ' + (maxi+1));
    }

    del(number) {
        if (this.slotMachine.length <= 0) {
            console.log('You do not have SlotMachines.');
        } else if ((number > this.slotMachine.length) || (number < 0)) {
            console.log('You do not have SlotMachine ' + number);
        } else {
            let money = this.slotMachine[number-1]['money'] / (this.slotMachine.length - 1);
            this.slotMachine.splice(number-1,1);
            for(let i = 0; i < this.slotMachine.length; i++) {
                this.slotMachine[i].money = this.slotMachine[i].money + money;
            }
            console.log('You have just deleted SlotMachine ' + number);
        }
    }

    getMoneyBack(amount) {
        let initialAmount = amount;
        function compare(slotMachineA, slotMachineB) {
            return slotMachineB.money - slotMachineA.money;
        }
        this.slotMachine.sort(compare);
        for(let i = 0; i < this.slotMachine.length; i++) {
            if (this.slotMachine[i].money > amount) {
                this.slotMachine[i].money = this.slotMachine[i].money - amount;
                console.log('You get back ' + initialAmount + ' $.');
                return initialAmount;
            } else if (this.slotMachine[i].money < amount) {
                let x = this.slotMachine[i].money;
                this.slotMachine[i].money = this.slotMachine[i].money - x;
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

    getMoneySlotMachine(amount) {
        if (this.money >= amount) {
            this.money = this.money - amount;
            console.log('You get ' + amount + ' $.');
            casino.money = casino.money - amount;
        } else {
            console.log('You can not get this sum.');
        }
    }

    addMoneySlotMachine(amount) {
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
casino.newSlotMachine();
casino.add();
casino.getMoney();
casino.getSlotMachineQuantity();
casino.del(3);
casino.getMoneyBack(11);
casino.slotMachine[1].getCurrentMoney();
casino.slotMachine[1].getMoneySlotMachine(1);
casino.slotMachine[1].getCurrentMoney();
casino.getMoney();
casino.slotMachine[1].addMoneySlotMachine(1);
casino.slotMachine[1].getCurrentMoney();
casino.getMoney();
casino.slotMachine[1].play(10);