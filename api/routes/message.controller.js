
//   client.on("message", (data) => {
//     let messageAttributes = {
//         content: data.content,
//         userName: data.userName,
//         user: data.userId
//       },
//       m = new Message(messageAttributes);
//     m.save()
//       .then(() => {
//         io.emit("message", messageAttributes);
//       })
//       .catch(error => console.log(`error: ${error.message}`));
//   });
  



//   router.post("/getmessage", (req, res, next) => {
//   const userId = req.body.userId;
//   const toUserId = req.body.toUserId;
//   if (userId == '') {
//     response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
//       error : true,
//       message : CONSTANTS.USERID_NOT_FOUND
//     });
//   }else{
//     try {
//       const messagesResponse = getMessages({
//         userId:userId,
//         toUserId: toUserId
//       });
//       response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
//         error : false,
//         messages : messagesResponse
//       });
//     } catch ( error ){
//       response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
//         error : true,
//         messages : CONSTANTS.USER_NOT_LOGGED_IN
//       });
//     }
//   }
//       })

//  function  getMessages({userId, toUserId}){
//         const data = {
//             '$or' : [
//               { '$and': [
//                 {
//                   'toUserId': userId
//                 },{
//                   'fromUserId': toUserId
//                 }
//               ]
//             },{
//               '$and': [ 
//                 {
//                   'toUserId': toUserId
//                 }, {
//                   'fromUserId': userId
//                 }
//               ]
//             },
//           ]
//         };
//         return new Promise( async (resolve, reject) => {
//           try {
//             Messages.find(data).sort({'timestamp':1}).toArray( (err, result) => {
//               DB.close();
//               if( err ){
//                 reject(err);
//               }
//               resolve(result);
//             });
//           } catch (error) {
//             reject(error)
//           }
//         });	
//   }    