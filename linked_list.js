
// Linked list class
class LinkedList{
  constructor(){
    this.firstNode = null;
    this.lastNode = null;
    this.size = 0;
  }
  
  // Adds value at end of list
  addNode(value){
    let newNode = new Node(value);
    if(!this.firstNode){
      this.firstNode = newNode;
    } else {
      this.lastNode.setChild(newNode);
      newNode.setParent(this.lastNode);
    }
    
    this.lastNode = newNode;
    this.size += 1;
  }
  
  // Adds value at start of list
  prependNode(value){
    let newNode = new Node(value);
    if(this.firstNode){
      newNode.setChild(this.firstNode);
      this.firstNode.setParent(newNode);
    } else {
      this.lastNode = newNode;
    }
    
    this.firstNode = newNode;
    this.size += 1;
  }
  
  // Returns size of the list
  getSize(){
    return this.size;
  }

  // Returns first list element
  head(){
    return this.firstNode;
  }
  
  // Returns last list element
  tail(){
    return this.lastNode;
  }
  
  // Removes last list element
  pop(){
    if(!this.firstNode) return;
    if(this.size === 1){
      this.firstNode = null;
      this.lastNode = null;
      this.size = 0;
    } else {
      this.lastNode.parentNode.setChild(null);
      this.lastNode.setParent(null);
      this.lastNode = this.lastNode.parentNode;
      this.size -= 1;
    }
  }
  
  // Returns node at index
  at(index){
    if(this.size <= index) throw Error("Index out of range");
    
    return this.countForward(this.firstNode, index);
  }

  countForward(node, steps){
    if(steps == 0) return node;
    return this.countForward(node.childNode, steps-1);
  }

  // Adds value at index
  insertAt(value, index){
    if(index === 0){
      this.prependNode(value);

    } else if(index === this.size){
      this.addNode(value);

    } else {
      let currentNode = this.at(index);
      let newNode = new Node(value);

      newNode.childNode = currentNode;
      newNode.parentNode = currentNode.parentNode;
      currentNode.parentNode.childNode = newNode;
      currentNode.parentNode = newNode;
      
      this.size += 1;
    }
  }

  // Removes node at index
  removeAt(index){
    if(index >= this.size) throw Error("Index out of range");
    
    let currentNode = this.at(index);

    currentNode.parentNode.childNode = currentNode.childNode;
    currentNode.childNode.parentNode = currentNode.parentNode;

    this.size -= 1;
  }
  
  // Returns true if list contains value
  contains(value){
    return this.searchValue(value, this.firstNode);
  }

  searchValue(value, node){
    if(node === this.lastNode) return false;
    if(value === node.value) return true;
    return this.searchValue(value, node.childNode);
  }
  
  // Returns the index of value in list
  find(value){
    return this.findIndex(value, this.firstNode, 0);
  }

  findIndex(value, node, index){
    if(node === this.lastNode) return null;
    if(value === node.value) return index;

    return this.findIndex(value, node.childNode, index+1);
  }
  
  // Returns a string representing the list
  toString(){
    return this.stringify(this.firstNode, "");
  }
  
  stringify(node){
    if(node === this.lastNode) return " null";
    
    return `( ${node.value} ) -> ${this.stringify(node.childNode)}`
  }
}

// Node class
class Node{
  constructor(value){
    this.value = value;
    this.childNode = null;
    this.parentNode = null;
  }
  
  setChild(child){
    this.childNode = child;
  }
  
  setParent(p){
    this.parentNode = p;
  }
}

// Tests
let ll = new LinkedList();
ll.addNode("HELLO");
ll.addNode("MY");
ll.addNode("DIRTY");
ll.addNode("FRIEND");
ll.prependNode("HEY");
ll.addNode("NOOB");

ll.removeAt(3);
ll.pop();

console.log(ll.toString());
console.log(`The linked list has a size of ${ll.getSize()}`);
console.log(`The value at index ${2} is ${ll.at(2).value}`);

const value1 = "HEY";
const value2 = "ZEUBI";

console.log(ll.contains(value1) ? `Linked list contains value ${value1}` : `Linked list doesn't contain value ${value1}`);
console.log(`The value ${value1} is at position ${ll.find(value1)}`);

console.log(ll.contains(value2) ? `Linked list contains value ${value2}` : `Linked list doesn't contain value ${value2}`);
console.log(`The value ${value2} is at position ${ll.find(value2)}`);

ll.insertAt("BEST", 3);
console.log(ll.toString());
