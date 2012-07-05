if(!window['bc'])window['bc']={};
bc.namespace("bc.flow.comment");
bc.flow.comment = {
	init : function() {
		
	},
	/**意见保存方法*/
	save : function(){
		$page=$(this);
		//调用标准的方法执行保存
		bc.page.save.call($page,{callback: function(json){
			bc.msg.slide(json.msg);
			$page.dialog("close");
		}});
	},
	/**
	 * 删除意见
	 * 
	 * @param {Object} option 配置参数
	 * @option {String} id 意见ID
	 * @option {String} name 标题
	 */
	delete_ : function(option){
		bc.ajax({
			dataType:"json",
			url: bc.root +"/bc-workflow/comment/delete?id="+option.id,
			success: function(json){
				bc.msg.slide(json.msg);
			}
		});
	},
	/**
	 * 向公共信息添加意见
	 * @param {Object} option 配置参数
	 * @option {String} procId 流程实例ID
	 * @option {String} name 标题
	 *
	 */
	add2Common : function(option){
		bc.page.newWin({
			name:"添加公共意见",
			title:"添加公共意见",
		   	url: bc.root +"/bc-workflow/comment/create?procId="+option.procId,
			mid: "flow.comment.create."+option.procId
		});
	},
	/**
	 * 向流程任务添加意见
	 * 
	 * @param {Object} option 配置参数
	 * @option {String} procId 流程实例ID
	 * @option {String} tid 任务id
	 * @option {String} name 标题 
	 *
	 */
	create2Task : function(option){
		bc.page.newWin({
			name:"添加待办意见",
			title:"添加待办意见",
		   	url: bc.root +"/bc-workflow/comment/create",
		   	data:{procId:option.procId,tid:option.tid},
			mid: "flow.comment.create."+option.tid
		});
	},
	/**
	 * 查看意见
	 * 
	 * @param {Object} option 配置参数
	 * @option {String} procId 流程实例ID
	 * @option {String} id 意见id
	 * @option {String} name 标题  
	 */
	open : function(option){
		bc.page.newWin({
			name : option.name?option.name:"查看流程意见",
			title: option.title?option.title:"查看流程意见",
		   	url : bc.root +"/bc-workflow/comment/open",
		   	data : {procId:option.procId,id:option.id},
			mid : "flow.comment.open."+option.id
		});
	},
	/**
	 * 编辑流程意见
	 * 
	 * @param {Object} option 配置参数
	 * @option {String} procId 流程实例ID
	 * @option {String} id 意见id
	 * @option {String} name 标题  
	 */
	edit : function(option){
		bc.page.newWin({
			name : option.name?option.name:"编辑流程意见",
			title: option.title?option.title:"编辑流程意见",
		   	url : bc.root +"/bc-workflow/comment/edit",
		   	data : {procId:option.procId,id:option.id},
			mid : "flow.comment.edit."+option.id
		});
	},
};