// Implement the SocialNetwork class here
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class SocialNetwork {
  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++;
    const user = new User(this.currentID, name);
    this.users[this.currentID] = user;
    this.follows[this.currentID] = new Set();
    return this.currentID;
  }

  getUser(userID) {
    return userID in this.users ? this.users[userID] : null;
  }

  follow(userID1, userID2) {
    // Your code here
    if (!(userID1 in this.users && userID2 in this.users)) return false;
    if (!this.follows[userID1].has(userID2)) {
      this.follows[userID1].add(userID2);
      return true;
    } else {
      return false;
    }
  }

  getFollows(userID) {
    if (userID in this.follows) {
      return this.follows[userID];
    } else {
      return false;
    }
  }

  getFollowers(userID) {
    let followers = new Set();
    for (let i = 1; i <= this.currentID; i++) {
      if (this.follows[i].has(userID)) {
        followers.add(i);
      }
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    let queue = [[userID]];
    let set = new Set();
    let recs = [];

    while (queue.length > 0) {
      const path = queue.shift();
      const lastNode = path[path.length - 1];
      for (let neighbor of this.follows[lastNode]) {
        if (
          lastNode !== userID &&
          !this.follows[userID].has(neighbor) &&
          path.length - 1 <= degrees &&
          neighbor !== userID
        ) {
          recs.push(neighbor);
        }
        if (!set.has(neighbor)) {
          set.add(neighbor);
          queue.push(path.concat(neighbor));
        }
      }
    }
    return recs;
  }
}

module.exports = SocialNetwork;
