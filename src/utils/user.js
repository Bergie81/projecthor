import store from "@/store/store"
import { setDbPath } from "@/utils/dbData"
import { dbProjectsRef } from "@/firebase";
// Object is Project or Task
export const getMembers = (object) => {
    let memberList = [];
    if (Array.isArray(object._member)) {
        object._member.forEach(member => {
            store.getters.getUsers.filter(user => {
                if (user._id === member) {
                    memberList.push(user);
                }
            });
        });
    }
    return memberList; // Array
};
// Object is Project or Task
export const getAllMembers = (object) => {
    let memberlist = [];
    memberlist.push(object._inCharge);
    if (object._member) {
        memberlist = memberlist.push(object._member);
    }
    return memberlist; //Array
};
// Schribt User in Members des currentJobs, wenn nicht bereits vorhanden
export const addUserToJob = (user, currentJob) => {
      let memberList = [];
      let alreadyJoined = false;
      if (user === currentJob._inCharge) {
        alreadyJoined = true;
      }
      const getOtherMembers = getMembers(currentJob);
      if (getOtherMembers[0]) {
        getOtherMembers.forEach(member => {
          // Get all Project Members
          memberList.push(member._id);
          if (member._id === user) {
            alreadyJoined = true;
          }
        });
      }
      if (!alreadyJoined) {
        // Add User to List when he is not already Member
        memberList.push(user);
        dbProjectsRef
          .child(`${setDbPath(currentJob).members}`)
          .set(memberList);
      }
    }