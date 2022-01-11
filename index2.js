document.querySelector("#insert-btn").addEventListener("click", insert);
// document.querySelector("#delete-btn").addEventListener("click", del);
document.querySelector("#inorder").addEventListener("click", inorder);
document.querySelector("#preorder").addEventListener("click", preorder);
document.querySelector("#postorder").addEventListener("click", postorder);
//add event listener for enter key

class Node {
  constructor(value, trav) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.traversal = trav;
  }
}

class Tree {
  constructor() {
    this.root = null;
    this.levels = 1;
  }

  addNewLevel(node, level, trav) {
    this.levels += 1;

    //create new row
    let row = document.createElement("tr");
    row.classList.add("layer");
    row.id = "layer" + String(level);

    //create td for each possible element in this level
    let prevLayer = document
      .getElementById("layer" + String(this.levels - 1))
      .querySelectorAll("td"); //all td of previous layer
    for (let i = 0; i < prevLayer.length; i++) {
      let el1 = document.createElement("td");
      let el2 = document.createElement("td");
      el1.id = prevLayer[i].id + "l";
      el2.id = prevLayer[i].id + "r";
      row.appendChild(el1);
      row.appendChild(el2);
    }
    document.querySelector(".tree").appendChild(row);

    //render node on page
    document.getElementById(trav).textContent = node.value;
    document.getElementById(trav).classList.add("node");
  }

  addToExisting(node, trav) {
    document.getElementById(trav).textContent = node.value;
    document.getElementById(trav).classList.add("node");
  }

  treeInsert(r, node, level, trav) {
    if (node.value <= r.value) {
      if (r.left === null) {
        node.traversal = trav + "l";
        r.left = node;
        level+=1;
        trav+="l";
        if (level>this.levels) {
            this.addNewLevel(node, level, trav);
        }
        else {
            this.addToExisting(node, trav);
        }
      } else {
        this.treeInsert(r.left, node, (level += 1), (trav += "l"));
      }
    } else {
      if (r.right === null) {
        node.traversal = trav + "r";
        trav+="r";
        r.right = node;
        level+=1;
        
        if (level>this.levels) {
            this.addNewLevel(node, level, trav);
        }
        else {
            this.addToExisting(node, trav);
        }
        
      } else {
        this.treeInsert(r.right, node, (level += 1), (trav += "r"));
      }
    }
  }



}

let tree = new Tree();

function insert() {
  let treeclass = document.querySelector(".tree");
  let toAdd = Number(document.querySelector("#insert").value);
  document.querySelector("#insert").value = null;

  //checking for empty input
  if (toAdd === "") {
    alert("Please insert and integer.");
  }
  //creating new node if input is valid
  let newNode = new Node((value = toAdd), (traversal = "r"));
  //dealing with corner case of creating root
  if (tree.root === null) {
    tree.root = newNode;
    newNode.traversal = "r";
    let row = document.createElement("tr");
    let el = document.createElement("td");
    el.id = "r";
    el.classList.add("node");
    el.textContent = toAdd;
    row.appendChild(el);
    row.classList.add("layer");
    row.id = "layer1";
    treeclass.append(row);
  } else {
    tree.treeInsert(tree.root, newNode, 1, "r");
  }
}



function del() {
  //error check for value!= int and value==null
  //error check for value not exist
}

function toggleNode(id) {
  document.getElementById(id).classList.toggle("node2");
}

function animateTrav(order) {
  for (let i=0; i<order.length; i++) {
    setTimeout(toggleNode,(i+1)*1000, order[i]);
    setTimeout(toggleNode, (order.length+1)*1000, order[i]);
  }


}

function inorder() {
  //check for empty tree
  if (tree.root===null) {
    alert('The tree is empty.');
  }

  else {
    let order = inTrav(tree.root,[]);
    animateTrav(order);
  }
  
}

function inTrav(r,order) {
  if (r!=null) {

    inTrav(r.left, order)
    
    // document.getElementById(r.traversal).classList.toggle("node2")
    order.push(r.traversal);

    inTrav(r.right, order);
  }
  return order;
}

function preorder() {
  //check for empty tree
  if (tree.root===null) {
    alert('The tree is empty.');
  }
  else {
    let order = preTrav(tree.root, []);
    animateTrav(order);
  }
}

function preTrav(r, order) {
  if (r!=null) {
    order.push(r.traversal);

    preTrav(r.left, order);

    preTrav(r.right, order);
  }
  return order
}

function postorder() {
  //check for empty tree
  if (tree.root===null) {
    alert('The tree is empty.');
  }
  else {
    let order = postTrav(tree.root, []);
    animateTrav(order);
  }
}

function postTrav(r, order) {
  if (r!=null) {
    preTrav(r.left, order);
    
    preTrav(r.right, order);

    order.push(r.traversal);
  }
  return order
}

function drawline(from, to) {
    let rect = document.getElementById(from.traversal).getBoundingClientRect();
    let rect2 = document.getElementById(to.traversal).getBoundingClientRect();
    let x1= (rect.left);
    let y1 = (rect.top);
    let x2 = (rect2.left);
    let y2 = (rect2.top);
    let line = document.createElement('line');
    line.setAttribute('x1',x1);
    line.setAttribute('y1',y1);
    line.setAttribute('x2',x2);
    line.setAttribute('y2',y2);
    line.style="stroke-width:2px,stroke:rgb(0,0,0)";

    return line;
    


}
