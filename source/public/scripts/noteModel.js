/* eslint-disable no-unused-vars */
const notes = [
    {"id": "2", 
    "title": "Note 2", 
    "dueDate": "2023/05/19", 
    "creationDate": "2023/05/01", 
     "importance": 3,
     "details" : "blabla2",
     "status" : 4 
    },
    {"id": "1", 
    "title": "Note 1", 
    "dueDate": "2023/05/18", 
    "creationDate": "2023/05/01", 
     "importance": 3,
     "details" : "blabla",
     "status" : 1 
    }
];


function compareNotes(n1, n2) {
    return n1.id - n2.id;
}

function notesSorted(){
    return [...notes].sort(compareNotes());
}




