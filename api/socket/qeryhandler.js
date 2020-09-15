const User = require("../models/user");
class QueryHandler{


	makeUserOnline(userId){
		return new Promise( async (resolve, reject) => {
			try {
				User.findAndModify({
					_id : userId
				},[],{ "$set": {'online': 'Y'} },{new: true, upsert: true}, (err, result) => {
				
					if( err ){
						reject(err);
					}
					resolve(result.value);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}


	userSessionCheck(data){
		return new Promise( async (resolve, reject) => {
			try {
				User.findOne( { _id : ObjectID(data.userId) , online : 'Y'}, (err, result) => {
				
					if( err ){
						reject(err);
					}
					resolve(result);
				});	
			} catch (error) {
				reject(error)
			}
		});
	}

	getUserInfo({userId,socketId = false}){
		let queryProjection = null;
		if(socketId){
			queryProjection = {
				"socketId" : true
			}
		} else {
			queryProjection = {
				"username" : true,
				"online" : true,
				'_id': false,
				'id': '$_id'
			}
		}
		return new Promise( async (resolve, reject) => {
			try {
				User.aggregate([{
					$match:  {
						_id : ObjectID(userId)
					}
				},{
					$project : queryProjection
				}
				]).toArray( (err, result) => {
					
					if( err ){
						reject(err);
					}
					socketId ? resolve(result[0]['socketId']) : resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	addSocketId({userId, socketId}){
		const data = {
			id : userId,
			value : {
				$set :{
					socketId : socketId,
					online : 'Y'
				}
			}
		};
		return new Promise( async (resolve, reject) => {
			try {
				
				User.update( { _id :data.id}, data.value ,(err, result) => {
					DB.close();
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	getChatList(userId){
		return new Promise( async (resolve, reject) => {
			try {
				User.aggregate([{
					$match: {
						'socketId': { $ne : userId}
					}
				},{
					$project:{
						"username" : true,
						"online" : true,
						'_id': false,
						'id': '$_id'
					}
				}
				]).toArray( (err, result) => {
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	insertMessages(messagePacket){
		return new Promise( async (resolve, reject) => {
			try {
				Message.insertOne(messagePacket, (err, result) =>{
					
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	getMessages({userId, toUserId}){
		const data = {
				'$or' : [
					{ '$and': [
						{
							'toUserId': userId
						},{
							'fromUserId': toUserId
						}
					]
				},{
					'$and': [ 
						{
							'toUserId': toUserId
						}, {
							'fromUserId': userId
						}
					]
				},
			]
		};	    
		return new Promise( async (resolve, reject) => {
			try {
				Message.find(data).sort({'timestamp':1}).toArray( (err, result) => {
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	logout(userID,isSocketId){
		const data = {
			$set :{
				online : 'N'
			}
		};
		return new Promise( async (resolve, reject) => {
			try {
						
				let condition = {};
				if (isSocketId) {
					condition.socketId = userID;
				}else{
					condition._id = ObjectID(userID);
				}
				User.update( condition, data ,(err, result) => {
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}
}

module.exports = new QueryHandler();