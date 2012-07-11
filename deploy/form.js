bc.namespace("bc.deploy");
bc.deployForm = {
	init : function(option,readonly) {
		var $form = $(this);
		
		if(readonly) return;
			
		//绑定清除按钮事件
		$form.find("#cleanFileId").click(function(){
			$form.find(":input[name='e.path']").val('');
			$form.find(":input[name='e.subject']").val('');
		});
		
		//绑定下载按钮事件
		$form.find(".downLoadFileId").click(function(){
			var subject=$form.find(":input[name='e.subject']").val();
			var path=$form.find(":input[name='e.path']").val();
			var id=$form.find(":input[name='e.id']").val();
			if(id==""){
				bc.msg.slide('请先保存流程部署文件！');
				return;
			}
			
			if(!bc.validator.validate($form)) return;
			
			var n =  subject;// 获取文件名
			var f = "workflow/deploy/" + path;// 获取附件相对路径			
			// 下载文件
			bc.file.download({f: f, n: n,ptype:"deploy",puid:$form.find(":input[name='e.uid']").val()});
		});
		
	},
	/** 文件上传完毕后 */
	afterUploadfile : function(json){
		logger.info($.toJSON(json));
		if(json.success){
			var $page = this.closest(".bc-page");
			$page.find(':input[name="e.subject"]').val(json.source); //标题
			$page.find(':input[name="e.path"]').val(json.to); //路径
			$page.find(':input[name="e.source"]').val(json.source); //原始文件名
		}else{
			bc.msg.alert(json.msg);
		}
	},
	/**
	 * 保存
	 */
	save : function(){
		var $form = $(this);
		//定义函数
		function saveInfo(){
			var id=$form.find(":input[name='e.id']").val();
			var code=$form.find(":input[name='e.code']").val();
			var version=$form.find(":input[name='e.version']").val();
			var url=bc.root+"/bc-workflow/deploy/isUniqueCodeAndVersion";
			$.ajax({
				url:url,
				data:{id:id,code:code,version:version},
				dataType:"json",
				success:function(json){
					var result=json.result;
					if(result=='save'){
						bc.page.save.call($form);
					}else{
						//系统中已有此编码
						bc.msg.alert("此编码、版本号已被其它部署流程使用，请修改编码或版本号！");
					}
				}
			});
		}
		
		//验证表单
		if(!bc.validator.validate($form)) return;
		
		//模板类型后缀名
		var path=$form.find(":input[name='e.path']").val();
		
		//验证后缀名
		var lastIndex=path.lastIndexOf(".");
		if(lastIndex==-1){
			bc.msg.alert('上传的文件后缀名错误！');
			return;
		}
		//后缀名
		var ext=path.substr(lastIndex+1);
		var typeExt1 = "xml";
		var typeExt2 = "bpmn";
		var typeExt3 = "bar";
		var typeExt4 = "zip";
		var typeSelect = $(":input[name='e.type']")[0].selectedIndex;
		
		//判断上传文件的后缀名是否与模板类型的后缀名相同  
		if(typeSelect == 0){//XML
			if(ext == typeExt1 || ext == typeExt2){
				saveInfo();
			}else{
				bc.msg.alert("只能上传扩展名为"+'".bpmn20.xml"或"bpmn的文件"');
				return;
			}
		}
		
		if(typeSelect == 1){//BAR
			if(ext == typeExt3 || ext == typeExt4){
				saveInfo();
			}else{
				bc.msg.alert("只能上传扩展名为"+'".bar"或".zip的文件"');
				return;
			}
		}
	}
};