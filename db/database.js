const mysql = require("mysql");
const mysqlConfig = require("./config.js");
const connection = mysql.createConnection(mysqlConfig);

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

let registere = (arr, callback) => {
  console.log("hheheh");

  var sql = `UPDATE students SET firstname = ? , lastname = ? , country = ?, city = ?, address = ?, driving = ?, dateOfBirth = ?, placeOfBirth = ?, nationality = ?, educationlvl = ?,feald = ? , postalcode = ?,dreamJob=?, socialLink = ?, skills = ?, languages = ?, hobbies = ?, profilePic = ?, summery= ? , firstTime = ? WHERE username= ?;`;
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

let registerCompany = (arr, callback) => {
  console.log("hheheh");
  console.log(arr);
  var sql = `UPDATE companies SET email = ? , owner = ? , field = ?, numberOfEmployees = ?, location = ?, website = ?, logo = ?, about = ? ,  firstTime = ? WHERE name= ?;`;

  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};
let registerTrainingCenter = (arr, callback) => {
  console.log("hahaha");
  console.log(arr);
  var sql = `UPDATE trainingCenters SET email = ? , owner = ? , trainingOptions = ?, numberOfStudentGraduated = ?, location = ?, website = ?, logo = ?, about = ? ,  firstTime = ? WHERE name= ?;`;

  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

let verificationRequest = (arr, callback) => {
  var sql = "UPDATE students SET verRequest = ?  WHERE username= ?;";
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

let verificationRequestCompany = (arr, callback) => {
  var sql = "UPDATE companies SET verRequest = ?  WHERE name= ?;";
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

let verificationRequestCenter = (arr, callback) => {
  var sql = "UPDATE trainingCenters SET verRequest = ?  WHERE name= ?;";
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

let verifyStudent = (arr, callback) => {
  var sql = "UPDATE students SET verification = ?  WHERE username= ?;";
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

let rejectStudent = (arr, callback) => {
  var sql = "UPDATE students SET verRequest = ?  WHERE username= ?;";
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

////////////////////////////////////////////

let verifyCompanies = (arr, callback) => {
  var sql = "UPDATE companies SET verification = ?  WHERE name= ?;";
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

let rejectCompanies = (arr, callback) => {
  var sql = "UPDATE companies SET verRequest = ?  WHERE name= ?;";
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

/////////////////////////////////////////////////

////////////////////////////////////////////

let verifyCenter = (arr, callback) => {
  var sql = "UPDATE trainingCenters SET verification = ?  WHERE name= ?;";
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

let rejectCenter = (arr, callback) => {
  var sql = "UPDATE trainingCenters SET verRequest = ?  WHERE name= ?;";
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

/////////////////////////////////////////////////
const getNonVerifiedStudents = function () {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from students where verification='false' and verRequest='true';`,
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};

const getNonVerifiedCompany = function () {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from companies where verification='false' and verRequest='true';`,
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};

const getNonVerifiedCenters = function () {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from trainingCenters where verification='false' and verRequest='true';`,
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};

const addStudent = (arr, callback) => {
  let sql =
    "insert into students (username ,secretinfo, password, email) values (?,?,?,?)";
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const addStudentSociel = (arr, callback) => {
  let sql =
    "insert into students (username ,secretinfo, password, email,token) values (?,?,?,?,?)";
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};
const getUserInfo = (username, callback) => {
  let sql = `select password from students where username = '${username}' or email = '${username}'`;
  connection.query(sql, (err, data) => {

    if (err) throw callback(err);
    callback(null, data);
  });
};

const usernameAndEmail = (callback) => {
  let sql = `select username,email from students;`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};


const addCompany = (arr, callback) => {
  let sql = "insert into companies (name,password,email) values(?,?,?)";
  connection.query(sql, arr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
};

const companyName = (callback) => {
  let sql = `select name, email from companies;`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};


const logCompanies = (name, callback) => {
  let sql = `select password from companies where name = '${name}' or email = '${name}'`;
  connection.query(sql, (err, data) => {

    if (err) throw callback(err, null);
    callback(null, data);
  });
};
const addTC = (arr, callback) => {
  let sql = "insert into trainingCenters (name,password,email) values(?,?,?)";
  connection.query(sql, arr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
};

const checkTcName = (callback) => {
  let sql = `select name, email from trainingCenters;`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};


const logTC = (name, callback) => {
  let sql = `select password from trainingCenters where name = '${name}' or email = '${name}'`;
  connection.query(sql, name, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const tcMessage = (name, callback) => {
  let sql = `select name from trainingCenters where name = '${name}' or email = '${name}'`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
}

const companyMessage = (name, callback) => {
  let sql = `select name from companies where name = '${name}' or email = '${name}'`;
  connection.query(sql, (err, data) => {

    if (err) throw callback(err, null);
    callback(null, data);
  });
}

const studentsMessage = (name, callback) => {
  let sql = `select username from students where username = '${name}' or email = '${name}'`;
  connection.query(sql, (err, data) => {

    if (err) throw callback(err, null);
    callback(null, data);
  });
}

const getUserStatus = (username, callback) => {
  let sql = `select * from students where username = '${username}' or email = '${username}'`;
  connection.query(sql, (err, data) => {

    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const getCompanyStatus = (username, callback) => {
  let sql = `select * from companies where name = ?`;
  connection.query(sql, username, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const getCenterStatus = (username, callback) => {
  let sql = `select * from trainingCenters where name = ?`;
  connection.query(sql, username, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

// UPDATE Person
// SET Address = 'ups'
// WHERE LastName = 'Hussein'

const saveUserToken = (username, token, callback) => {
  let sql = `update students set token = '${token}' WHERE username = '${username}'`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const saveCompToken = (name, token, callback) => {
  let sql = `update companies set token = '${token}' WHERE name = '${name}'`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const saveTcToken = (name, token, callback) => {
  let sql = `update trainingCenters set token = '${token}' WHERE name = '${name}'`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};
const selectUserByToken = (token, callback) => {
  let sql = `select * from students where token = '${token}'`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const selectCompanyByToken = (token, callback) => {
  let sql = `select * from companies where token = '${token}'`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const selectTcByToken = (token, callback) => {
  let sql = `select * from trainingCenters where token = '${token}'`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

////////////////////////////////////////////

/////////////////////////////////////////////////


const updateUser = (username, obj, callback) => {
  var arr = Object.keys(obj);
  var arr1 = Object.values(obj);
  for (var i = 0; i < arr.length; i++) {
    let sql = `UPDATE students SET ${arr[i]} = '${arr1[i]}' WHERE username = '${username}'`;
    connection.query(sql, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
};

const fetchAllProfile = (callback) => {
  let sql = "select username from students";
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const fetchProfile = (username, callback) => {
  let sql = `select * from students where username = '${username}'`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const updateCompany = (username, obj, callback) => {
  var arr = Object.keys(obj);
  var arr1 = Object.values(obj);
  for (var i = 0; i < arr.length; i++) {
    let sql = `UPDATE companies SET ${arr[i]} = '${arr1[i]}' WHERE name = '${username}'`;
    connection.query(sql, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
};

const getPosts = (callback) => {
  let sql = `select * from post `;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};
const addPost = (arr, callback) => {
  let sql =
    "insert into post (title,description,image,type,owner,rate,salary,contact) values(?,?,?,?,?,?,?,?)";
  connection.query(sql, arr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
};

const deletePost = (arr, callback) => {
  let sql = "DELETE FROM post WHERE id = ?";
  connection.query(sql, arr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
};

const savePosts = (arr, callback) => {
  let sql = `insert into post (title ,description, type, salary, owner, contact , image) values (?,?,?,?,?,?,?)`;
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const updateTc = (username, obj, callback) => {
  var arr = Object.keys(obj);
  var arr1 = Object.values(obj);
  for (var i = 0; i < arr.length; i++) {
    let sql = `UPDATE trainingCenters SET ${arr[i]} = '${arr1[i]}' WHERE name = '${username}'`;
    connection.query(sql, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
};

//select posts by owner to render in company profile

const postsByOwner = (owner, callback) => {
  let sql = `select * from post where owner = '${owner}'`;
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

//delete posts inside company profile using owner
const delCompPosts = (id, callback) => {
  let sql = `DELETE FROM post WHERE id = ${id}`;
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

//update company posts by id before modify
const updateOnePost = (id, obj, callback) => {
  var arr = Object.keys(obj);
  var arr1 = Object.values(obj);
  for (var i = 0; i < arr.length; i++) {
    let sql = `UPDATE post SET ${arr[i]} = '${arr1[i]}' WHERE id = '${id}'`;
    connection.query(sql, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
};

const getPostsOfTc = (arr, callback) => {
  let sql = `select * from post WHERE owner = ?  `;
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};
const updatePost = (arr, callback) => {
  let sql =
    "UPDATE post SET  title = ? , description= ? ,   image = ? , salary = ? ,  contact = ?  WHERE id = ? ";
  connection.query(sql, arr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
};

////////////////////////////////////////////////////////////
const getAllStudents = (callback) => {
  let sql = `select * from students `;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const getAllCompanies = (callback) => {
  let sql = `select * from companies `;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};
const getAllTrainingCenters = (callback) => {
  let sql = `select * from trainingCenters `;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};
const deletePostTc = (arr, callback) => {
  let sql = "DELETE FROM post WHERE id = ?";
  connection.query(sql, arr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
};

const banStudent = (arr, callback) => {
  let sql = "DELETE FROM student WHERE id = ?";
  connection.query(sql, arr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
};

const banCompany = (arr, callback) => {
  let sql = "DELETE FROM companies WHERE id = ?";
  connection.query(sql, arr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
};
const banCenter = (arr, callback) => {
  let sql = "DELETE FROM trainingCenters WHERE id = ?";
  connection.query(sql, arr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
};
const StApply = (arr, callback) => {
  let sql = `insert into notification (title ,owner, studentName) values (?,?,?)`;
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};
const getStudentApplication = (arr, callback) => {
  let sql = `select * from notification WHERE owner = ?  `;
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};
const deleteApp = (arr, callback) => {
  let sql = "DELETE FROM notification WHERE id = ?";
  connection.query(sql, arr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
};
const acceptApp = (arr, callback) => {
  let sql = "DELETE FROM notification WHERE id = ?";
  connection.query(sql, arr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
};

const getCenterNumberOfPostsAvailble = (id, callback) => {
  let sql = `select numberOfPostsAvaible from trainingCenters where id = '${id}'`;
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const updateNumberOfPosts = (arr, callback) => {
  let sql = `UPDATE trainingCenters SET  numberOfPostsAvaible = ?   WHERE id = ? `;
  connection.query(sql, arr, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const weeklydataSilver = (arr, callback) => {
  let sql = `UPDATE trainingCenters SET  numberOfPostsAvaible = 3   WHERE memberShip = 'silver' `;
  connection.query(sql, arr, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const weeklydataGold = (arr, callback) => {
  let sql = `UPDATE trainingCenters SET  numberOfPostsAvaible = 5   WHERE memberShip = 'gold' `;
  connection.query(sql, arr, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const weeklydataPlat = (arr, callback) => {
  let sql = `UPDATE trainingCenters SET  numberOfPostsAvaible = 10   WHERE memberShip = 'plat' `;
  connection.query(sql, arr, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const changeMembershipToPlat = (arr, callback) => {
  let sql = `UPDATE trainingCenters SET  numberOfPostsAvaible = 10 , memberShip = 'plat'   WHERE name = ? `;
  connection.query(sql, arr, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const changeMembershipToGold = (arr, callback) => {
  let sql = `UPDATE trainingCenters SET  numberOfPostsAvaible = 5 , memberShip = 'Gold'   WHERE name = ? `;
  connection.query(sql, arr, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

//let sql = `UPDATE post SET ${arr[i]} = '${arr1[i]}' WHERE id = '${id}'`
//save users report to db
const userReports = (arr, callback) => {
  let sql = `insert into feedbacks (username ,typeOfUser, message) values (?,?,?)`;
  connection.query(sql, arr, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

//get the reports for the admin
const getReports = (callback) => {
  connection.query("select * from feedbacks", (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

//delete one report for the admin
const delOneReport = (id, callback) => {
  let sql = `DELETE FROM feedbacks WHERE id = '${id}'`;
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

//delete all report for the admin
const delAllReports = (callback) => {
  connection.query(`TRUNCATE TABLE feedbacks`, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const reportSt = (arr, callback) => {
  let sql = `insert into reports (name , reason , comment , postId) values (?,?,? ,?)`;
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};


const getReportsFromUser = (callback) => {
  let sql = `select * from reports `;
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const addCoach = (arr, callback) => {
  let sql = `insert into coach (fullName ,image ,  diplome , experience , about,email,number) values (?,?,?,?,?,?,?)`;

  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};

const getCoaches = (callback) => {
  let sql = `select * from coach `;
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};


// POST A NEW TREE 
const addTree = (arr, callback) => {
  let sql = `insert into trees (job , field ) values (?,?)`;
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};


// get all the trees 
const getTrees = (callback) => {
  let sql = `select * from trees  `;
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};


// POST A NEW PATH
const addPath = (arr, callback) => {
  let sql = `insert into paths (name , stepOne , descOne , stepTwo ,descTwo , stepThree , descThree , stepFour , descFour , stepFive , descFive , stepSix , descSix , stepSeven , descSeven ,stepEight ,descEight , stepNine , descNine , stepTen , descTen ) values (? , ? , ? , ? ,? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ,? ,? , ? , ? , ? , ? )`;
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};


const getPaths = (callback) => {
  let sql = `select * from paths  `;
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

// get the PATHS by name

const pathsName = (pathName, callback) => {
  let sql = `select * from paths where name = '${pathName}'`
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}





// POST A NEW relation  
const addrelation = (arr, callback) => {
  let sql = `insert into relations (treeName , pathName ) values (?,?)`;
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
};


// get all the relations  
const getJoin = (tree, callback) => {

  let sql = `select * from relations WHERE treeName="${tree}"  `;
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

////////////// POST AND GET COMMENT POST/////////////
const postComments = (arr, callback) => {

  let sql = `insert into comments (postId, username, postsText, imgUrl) values(?,?,?,?)`;
  connection.query(sql, arr, (err, data) => {
    if (err) throw callback(err, null);
    callback(null, data);
  });
}

const getCommentsById = (id, callback) => {
  let sql = `select * from comments where postId = ${id}`
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

//check existing username in singUp students
const checkExistingUsername = (username, callback) => {

  let sql = `select username from students where username like '${username}%'`
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

//check username in singUp students

const checkUsername = (username , callback) => {
  let sql = `select username from students where username = '${username}'`
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}



// taking the user mail from username

const bringMail = (username, callback) => {
  let sql = `select email from students where username = '${username}'`;
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

//send email to user from the company

var transporter = require('./mailSender').transporter

const senderMail = (param, username, companyName) => {
  var mailOptions = {
    from: 'alaa.rabai@gmail.com',
    to: param,
    subject: 'Sending Email using Node.js',
    text: `dear ${username} we're here to inform you that your application for ${companyName} company have been approved and their willing to discuss your duties/salary  and are wishing you the best in your new journey . good luck`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


// handle social login 
const checkForSocialLog = (callback) => {
  let sql = `select username from students `
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

//check for social login
const getStudentsData = (username, callback) => {
  let sql = `select * from students where username = '${username}'`
  connection.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}
module.exports = {
  addStudentSociel,
  getStudentsData,
  checkForSocialLog,
  studentsMessage,
  companyMessage,
  tcMessage,
  bringMail,
  senderMail,
  checkUsername,
  checkExistingUsername,
  getCommentsById,
  postComments,
  pathsName,
  getJoin,
  addrelation,
  getPaths,
  addPath,
  getTrees,
  addTree,

  getCoaches,
  addCoach,
  usernameAndEmail,
  getReportsFromUser,
  reportSt,

  delAllReports,
  delOneReport,
  getReports,
  userReports,
  changeMembershipToPlat,
  changeMembershipToGold,
  weeklydataPlat,
  weeklydataGold,
  weeklydataSilver,
  updateNumberOfPosts,
  getCenterNumberOfPostsAvailble,
  acceptApp,
  deleteApp,
  getStudentApplication,
  StApply,
  updatePost,
  updateOnePost,
  delCompPosts,
  postsByOwner,
  banCenter,
  banCompany,
  banStudent,
  getAllTrainingCenters,
  getAllCompanies,
  getAllStudents,
  deletePostTc,
  getPostsOfTc,
  updateTc,
  savePosts,
  deletePost,
  addPost,
  updateCompany,
  fetchProfile,
  fetchAllProfile,
  updateUser,
  selectTcByToken,
  selectCompanyByToken,
  selectUserByToken,
  saveTcToken,
  saveCompToken,
  saveUserToken,
  registere,
  verificationRequest,
  getNonVerifiedStudents,
  verifyStudent,
  rejectStudent,
  registerCompany,
  registerTrainingCenter,
  getNonVerifiedCompany,
  getNonVerifiedCenters,
  verifyCompanies,
  rejectCompanies,
  verifyCenter,
  rejectCenter,
  verificationRequestCompany,
  verificationRequestCenter,
  addStudent,
  getUserInfo,
  addCompany,
  companyName,
  logCompanies,
  checkTcName,
  addTC,
  logTC,
  getUserStatus,
  getCompanyStatus,
  getCenterStatus,
  getPosts,
};


