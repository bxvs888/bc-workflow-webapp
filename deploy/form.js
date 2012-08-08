bc.namespace("bc.deploy");
bc.deployForm = {
	init : function(option,readonly) {
		var $form = $(this);
		
		if(readonly) return;
		
		var liTpl = '<li class="horizontal deployUserLi ui-widget-content ui-corner-all ui-state-highlight" data-id="{0}"'+
		'style="position: relative;margin:0 2px;float: left;padding: 0;border-width: 0;">'+
		'<span class="text">{1}</span>'+
		'<span class="click2remove verticalMiddle ui-icon ui-icon-close" style="margin: -8px -2px;" title={2}></span></li>';
		var ulTpl = '<ul class="horizontal deployUserUl" style="padding: 0 45px 0 0;"></ul>';
		var title = $form.find("#assignUsers").attr("data-removeTitle");
		
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
		
		
		//绑定添加用户的按钮事件处理
		$form.find("#addUsers").click(function(){
			var $ul = $form.find("#assignUsers .deployUserUl");
			var $lis = $ul.find("li");
			var selecteds="";
			$lis.each(function(i){
				selecteds+=(i > 0 ? "," : "") + ($(this).attr("data-id"));//
			});
			bc.identity.selectUser({
				multiple: true,//可多选
				history: false,
				selecteds: selecteds,
				onOk: function(users){
					$.each(users,function(i,user){
						if($lis.filter("[data-id='" + user.id + "']").size() > 0){//已存在
							logger.info("duplicate select: id=" + user.id + ",name=" + user.name);
						}else{//新添加的
							if(!$ul.size()){//先创建ul元素
								$ul = $(ulTpl).appendTo($form.find("#assignUsers"));
							}
							$(liTpl.format(user.id,user.name,title))
							.appendTo($ul).find("span.click2remove")
							.click(function(){
								$(this).parent().remove();
							});
						}
					});
				}
			});
		});
		
		//绑定添加岗位的按钮事件处理
		$form.find("#addGroups").click(function(){
			var $ul = $form.find("#assignUsers .deployUserUl");
			var $lis = $ul.find("li");
			var selecteds = "";
			$lis.each(function(i){
				selecteds += (i > 0 ? "," : "") + $(this).attr("data-id");//已选择的id
			});
			bc.identity.selectGroup({
				multiple: true,
				selecteds: selecteds,
				onOk: function(groups){
					//添加当前没有分派的岗位
					$.each(groups,function(i,group){
						if($lis.filter("[data-id='" + group.id + "']").size() > 0){//已存在
							logger.info("duplicate select: id=" + group.id + ",name=" + group.name);
						}else{//新添加的
							if(!$ul.size()){//先创建ul元素
								$ul = $(ulTpl).appendTo($form.find("#assignUsers"));
							}
							$(liTpl.format(group.id,group.name,title))
							.appendTo($ul).find("span.click2remove")
							.click(function(){
								$(this).parent().remove();
							});
						}
					});
				}
			});
		});
		
		//绑定添加单位或部门的按钮事件处理
		$form.find("#addUnitOrDepartments").click(function(){
			var $ul = $form.find("#assignUsers .deployUserUl");
			var $lis = $ul.find("li");
			var selecteds = "";
			$lis.each(function(i){
				selecteds += (i > 0 ? "," : "") + $(this).attr("data-id");//已选择的id
			});
			bc.identity.selectUnitOrDepartment({
				multiple: true,
				selecteds: selecteds,
				onOk: function(groups){
					//添加当前没有分派的岗位
					$.each(groups,function(i,group){
						if($lis.filter("[data-id='" + group.id + "']").size() > 0){//已存在
							logger.info("duplicate select: id=" + group.id + ",name=" + group.name);
						}else{//新添加的
							if(!$ul.size()){//先创建ul元素
								$ul = $(ulTpl).appendTo($form.find("#assignUsers"));
							}
							$(liTpl.format(group.id,group.name,title))
							.appendTo($ul).find("span.click2remove")
							.click(function(){
								$(this).parent().remove();
							});
						}
					});
				}
			});
		});
		
		//绑定删除角色、用户的按钮事件处理
		$form.find("span.click2remove").click(function(){
			$(this).parent().remove();
		});
		
	},
	/** 文件上传完毕后 */
	afterUploadfile : function(json){
		logger.info($.toJSON(json));
		if(json.success){
			var $page = this.closest(".bc-page");
			var lastIndex = json.source.lastIndexOf(".");
			var filename = lastIndex != -1 ? json.source.substring(0,lastIndex) : json.source;
			$page.find(':input[name="e.code"]').val(filename); 		// 编码
			$page.find(':input[name="e.path"]').val(json.to); 		// 路径
			$page.find(':input[name="e.source"]').val(json.source); // 原始文件名
			var $subject = $page.find(':input[name="e.subject"]');
			if($subject.val().length == 0) $subject.val(filename); 	// 名称
		}else{
			bc.msg.alert(json.msg);
		}
	},
	/**
	 * 保存
	 */
	save : function(){
		var $form = $(this);
		
		//将用户的id合并到隐藏域
		var ids=[];
		$form.find("#assignUsers .deployUserLi").each(function(){
			ids.push($(this).attr("data-id"));
		});
		$form.find(":input[name=assignUserIds]").val(ids.join(","));
		
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
	},
	/**
	 * 查看流程图
	 */
	showDiagram : function(){
		var $form = $(this);
		var did = $(":input[name='e.deploymentId']").val();
		if(did.length == 0){
			bc.msg.alert("请先发布流程！");
			return;
		}
		window.open(bc.root + "/bc-workflow/deploy/diagram?did=" + did,"_blank");
	}
};