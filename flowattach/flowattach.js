/**
 * 流程附件处理函数
 *
 * @author lbj
 * @date 2012-07-06
 */
if(!window['bc'])window['bc']={};
bc.flowattach = {
		/**
		 * 新建流程附加信息
		 * @param {Object} option 配置参数
		 * @option {String} procId 流程实例ID 必填 
		 * @option {String} tid 流程任务ID 
		 * @option {int} type 类型：1-附件，2-意见 默认附件
		 * @option {boolean} common 是否公共信息 默认公共
		 * @option {Function} onOk 点击保存后的回调函数，
		 * 选返回一个对象 格式为{
		 * 					id:[id],				--id
		 * 					type:[type],			--type 类型：1-附件，2-意见
		 * 					common:[common],		--common 是否公共信息
		 * 					subject:[subject],		--附件类型下的标题
		 * 					path:[path],			--附件路径
		 * 					ext:[ext],				--附件扩展名
		 * 					desc:[desc]				--附件的时候为备注,意见的时候为意见信息
		 * 					}
		 */
		create : function(option){

			// 将一些配置参数放到data参数内(这些参数是提交到服务器的参数)
			option.data = jQuery.extend({
				procId : option.procId,
				tid : option.tid?option.tid:'',
				type : option.type?option.type:1,
				common : option.common? option.common : true
			},option.data);

			var	title_common='流程';
			var tltie_type='附加信息';
			var attach_type='attachment';
			
			if(option.data.common){
				title_common='公共';
			}else
				title_common='任务';
			
			if(option.data.type==1){
				title_type='附件';
			}else if(option.data.type==2){
				title_type='意见';
				attach_type='comment';
			}
				
			bc.page.newWin(jQuery.extend({
				name:'添加'+title_common+title_type,
				title:'添加'+title_common+title_type,
			   	url: bc.root +"/bc-workflow/flowattach/create",
				mid: 'flowattach.create.'+attach_type+'.'+option.data.procId+option.data.tid,
				afterClose: function(status){
					if(status && typeof(option.onOk) == "function"){
						option.onOk(status);
					}
				}
			},option));
		},
		
		/**
		 * 编辑流程附加信息
		 * @param {Object} option 配置参数
         * @option {int} id id号
		 * @option {Function} onOk 点击保存后的回调函数，
		 * 选返回一个对象 格式为{
		 * 					id:[id],				--id
		 * 					type:[type],			--type 类型：1-附件，2-意见
		 * 					common:[common],		--common 是否公共信息
		 * 					subject:[subject],		--附件类型下的标题
		 * 					path:[path],			--附件路径
		 * 					ext:[ext],				--附件扩展名
		 * 					desc:[desc]				--附件的时候为备注,意见的时候为意见信息
		 * 			}
		 */
		edit : function(option){
			bc.page.newWin(jQuery.extend({
				name:'修护流程添加信息',
				title:'维护流程添加信息',
			   	url: bc.root +"/bc-workflow/flowattach/edit?id="+option.id,
				mid: 'flowattach.edit.'+option.id,
				afterClose: function(status){
					if(status && typeof(option.onOk) == "function"){
						option.onOk(status);
					}
				}
			},option));
		},
		/**
		 * 查看流程附加信息
		 * @option {int} id 
		 *
		 */
		open : function(option){
			bc.page.newWin(jQuery.extend({
				name:'查看流程添加信息',
				title:'查看流程添加信息',
			   	url: bc.root +"/bc-workflow/flowattach/open?id="+option.id,
				mid: 'flowattach.open.'+option.id
			},option));
		},
		/**
		 * 删除流程附加信息
		 * @option {int} id 
		 *
		 */
		delete_ : function(option){
			bc.msg.confirm("确定要删除流程添加的信息吗？",function(){
				bc.ajax({
					url: bc.root +"/bc-workflow/flowattach/delete?id="+option.id,
					dataType: "json",
					success: function(json) {
						if(logger.debugEnabled)logger.debug("delete success.json=" + $.toJSON(json));
						if(json.success === false){
							bc.msg.alert(json.msg);// 仅显示失败信息
						}else
							bc.msg.slide(json.msg);
						
					}
				});
			});
		},
		/**
		 * 下载流程附加信息，只支持附件
		 * @option {string} subject 附件标题
		 * @option {string} path	附件路径
		 *
		 */
		download : function(option){
			var n =  option.subject;// 获取文件名
			var f = "workflow/attachment/" + option.path;// 获取附件相对路径			
			// 下载文件
			bc.file.download({f: f, n: n});
		}
}



