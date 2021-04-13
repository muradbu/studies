// https://stackoverflow.com/questions/50110844/what-is-the-difference-between-interface-and-abstract-class-in-typescript

// An interface is a contract that defines the properties and what the object that implements it can do. 
// For example, you could define what can do a Plumber and an Electrician:

interface IElectrician {
    layWires(): void
}

interface IPlumber {
    layPipes(): void
}

// Notice that the way you have to implement an interface is free. You can do that by instantiating a class, or with a simple object:

let thePlumber = {
    layPipes: () => {
        console.log("I was implemented through an object! Work with pipes...");
    }
}

let theElectrician = {
    layWires: () => {
        console.log("I was implemented through an object! Work with wires...");
    }
}

class Electrician implements IElectrician {
    layWires(): void {
        console.log("I was implemented through a class! Work with wires...");
    }
}

class Plumber implements IPlumber {
    layPipes(): void {
        console.log("I was implemented through a class! Work with wires...");
    }
}

function restoreHouse(e: IElectrician, p: IPlumber) {
    e.layWires()
    p.layPipes()
}

function connectArduino(e: IElectrician) {
    e.layWires()
}

restoreHouse(theElectrician, thePlumber)
restoreHouse(new Electrician, new Plumber)

// A new embedded software developer is introduced who pins wires to a micro controller. We can implement IElectrician:

class EmbeddedSoftwareDeveloper implements IElectrician {
    layWires(): void {
        console.log("I pinned a wire.");
    }
}

connectArduino(new EmbeddedSoftwareDeveloper)

// A class is both a contract and the implementation of a factory. 
// An abstract class is also an implementation but incomplete.
// Especially, an abstract class exists at runtime, even if it has only abstract methods (then instanceof can be used).

abstract class HouseRestorer {
    protected abstract layWires(): void
    protected abstract layPipes(): void

    restoreHouse() {
        this.layWires()
        this.layPipes()
    }
}

// This abstract class HouseRestorer defines how the methods layWires and layPipes will be used, 
// but it is up to a child class to implement the specialized treatments before it can be used.

class Bob extends HouseRestorer {
    constructor() {
        super()
        console.log("My name is Bob.");
    }

    protected layWires(): void {
        console.log("I am not an electrician, but Alice is.");
    }
    protected layPipes(): void {
        console.log("I laid down pipes.");
    }
}

class Alice extends HouseRestorer {
    constructor() {
        super()
        console.log("My name is Alice.");
    }

    protected layWires(): void {
        console.log("I laid down wires.");
    }
    protected layPipes(): void {
        console.log("I am not a plumber, but Bob is.");
        
    }
}

let bob = new Bob
bob.restoreHouse()

let alice = new Alice
alice.restoreHouse()