if(!window['bc'])window['bc']={};
bc.namespace("bc.flowattachForm");
bc.flowattachForm = {
	init : function() {
		$form=$(this);
		//绑定清除按钮事件
		$form.find("#cleanFileId").click(function(){
			bc.file.clearFileSelect($form.find("#uploadFile"));
			$form.find(":input[name='e.path']").val('');
			$form.find(":input[name='e.subject']").val('');
		});
		
		//绑定下载按钮事件
		$form.find(".downLoadFileId").click(function(){
			var subject=$form.find(":input[name='e.subject']").val();
			var path=$form.find(":input[name='e.path']").val();
			var id=$form.find(":input[name='e.id']").val();
			if(id==""){
				bc.msg.slide('请先保存附件！');
				return;
			}
			if(!bc.validator.validate($form)) return;
				
			var n =  subject;// 获取文件名
			var f = "workflow/attachment/" + path;// 获取附件相对路径			
			// 下载文件
			bc.file.download({f: f, n: n});
		});
	},
	/**意见保存方法*/
	save : function(){
		$page=$(this);
		
		//意见保存的特殊处理
		if($page.find(":input[name='e.type']").val()=='2'){
			var desc=$page.find(":input[name='e.desc']").val();
			var subject=$page.find(":input[name='e.subject']").val();
			if(desc==''&&subject==''){
				bc.msg.alert('请输入意见');
				return;
			}else if(desc==''){
				if(subject.length>30){
					bc.msg.alert('输入的简易意见过长，你可以简化简易意见或者在详细中输入.');
					return;
				}
				$page.find(":input[name='e.desc']").val(subject);	
			}else if(subject==''){
				if(desc.length<30){
					$page.find(":input[name='e.subject']").val(desc);
				}else{
					$page.find(":input[name='e.subject']").val(desc.substring(0,31));
				}
			}else{
				if(subject.length>30){
					bc.msg.alert('输入的简易意见过长，你可以简化简易意见或者在详细中输入.');
					return;
				}
			}
		}
	
		//调用标准的方法执行保存
		bc.page.save.call($page,{callback: function(json){
			bc.msg.slide(json.msg);
			$page.find(":input[name='e.ext']").val(json.ext);
			$page.find(":input[name='e.size']").val(json.size);
			
			//声明返回的信息
			var data = {};
			data.id=$page.find(":input[name='e.id']").val();
			data.type=$page.find(":input[name='e.type']").val();
			data.common=$page.find(":input[name='e.common']").val();
			data.subject=$page.find(":input[name='e.subject']").val();
			data.path=$page.find(":input[name='e.path']").val();
			data.desc=$page.find(":input[name='e.desc']").val();
			data.uid=$page.find(":input[name='e.uid']").val();
			data.ext=json.ext;
			data.size=json.size;
			data.author=json.author;
			data.fileDate=json.fileDate;
			data.modifier=json.modifier;
			data.modifiedDate=json.modifiedDate;
			logger.info($.toJSON(data));
			$page.data("data-status", data);
			$page.dialog("close");
		}});
	},
	/** 文件上传完毕后 */
	afterUploadfile : function(json){
		logger.info($.toJSON(json));
		if(json.success){
			var $page = this.closest(".bc-page");
			$page.find(':input[name="e.subject"]').val(json.source);
			$page.find(':input[name="e.path"]').val(json.to);
		}else
			bc.msg.alert(json.msg);
	}
};