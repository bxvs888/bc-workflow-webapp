<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="ws" title='<s:property value="title"/>'
	data-js='<s:url value="/bc-workflow/workspace/workspace.js"/>'
	data-initMethod='bc.flow.workspace.init'
	data-option='<s:property value="pageOption"/>' style="overflow-y: auto;">
	<!-- 异常信息区 -->
	<div class="error" style="display:none;"><s:property value="msg"/>(打开工作空间异常----这里输出友好点的异常信息)</div>
	
	<!-- 公共信息区 -->
	<div class="common ui-widget-content">
		<!-- 标题行 -->
		<div class="header line ui-widget-header">
			<span class="leftIcon ui-icon ui-icon-suitcase"></span>
			<span class="text">公共信息</span>
			<span class="rightIcons">
				<span class="addComment"><span class="ui-icon ui-icon-document"></span><span class="text link">添加意见</span></span>
				<span class="addAttach"><span class="ui-icon ui-icon-arrowthick-1-n"></span><span class="text link">添加附件</span></span>
				<span class="collapseChildren"><span class="ui-icon ui-icon-carat-2-n-s" title="折叠|展开所有子节点"></span></span>
				<span class="collapse"><span class="ui-icon ui-icon-triangle-1-n" title="折叠|展开公共信息"></span></span>
			</span>
		</div>
		<!-- 信息列表 -->
		<div class="info ui-widget-content">
			<div class="simple line">
				<span class="leftIcon ui-icon ui-icon-document"></span>
				<span class="text link">表单：月即将退出营运车辆确认表</span>
				<span class="rightIcons">
					<span class="edit"><span class="ui-icon ui-icon-pencil"></span><span class="text link">编辑</span></span>
					<span class="open"><span class="ui-icon ui-icon-document-b"></span><span class="text link">查看</span></span>
					<span class="open"><span class="ui-icon ui-icon-arrowthickstop-1-s"></span><span class="text link">下载</span></span>
					<span class="open"><span class="ui-icon ui-icon-closethick"></span><span class="text link">删除</span></span>
					<span class="collapse"><span class="ui-icon ui-icon-carat-1-ne" title="折叠|展开详细信息"></span></span>
				</span>
			</div>
			<div class="detail line low">
				<span class="leftIcon ui-icon ui-icon-clock"></span>
				<span class="text">创建：小张 2012-01-01 08:00，最后修改：小明 2012-01-01 08:00</span>
				<span class="rightIcons">
					<span class="audit"><span class="ui-icon ui-icon-bookmark"></span><span class="text link">审计</span></span>
				</span> 
			</div>
		</div>
		<div class="info ui-widget-content">
			<div class="simple line">
				<span class="leftIcon ui-icon ui-icon-document"></span>
				<span class="text link">附件：月即将退出营运车辆确认表</span>
				<span class="rightIcons">
					<span class="edit"><span class="ui-icon ui-icon-pencil"></span><span class="text link">编辑</span></span>
					<span class="open"><span class="ui-icon ui-icon-document-b"></span><span class="text link">查看</span></span>
					<span class="open"><span class="ui-icon ui-icon-arrowthickstop-1-s"></span><span class="text link">下载</span></span>
					<span class="open"><span class="ui-icon ui-icon-closethick"></span><span class="text link">删除</span></span>
					<span class="collapse"><span class="ui-icon ui-icon-carat-1-ne" title="折叠|展开详细信息"></span></span>
				</span>
			</div>
			<div class="detail line low">
				<span class="leftIcon ui-icon ui-icon-clock"></span>
				<span class="text">创建：小张 2012-01-01 08:00，最后修改：小明 2012-01-01 08:00</span>
				<span class="rightIcons">
					<span class="audit"><span class="ui-icon ui-icon-bookmark"></span><span class="text link">审计</span></span>
				</span>
			</div>
		</div>
	</div>
	
	<!-- 待办信息区 -->
	<div class="todo ui-widget-content">
		<!-- 标题行 -->
		<div class="header line ui-widget-header">
			<span class="leftIcon ui-icon ui-icon-suitcase"></span>
			<span class="text">待办信息</span>
			<span class="rightIcons">
				<span class="collapseChildren"><span class="ui-icon ui-icon-carat-2-n-s" title="折叠|展开所有子节点"></span></span>
				<span class="collapse"><span class="ui-icon ui-icon-triangle-1-n" title="折叠|展开公共信息"></span></span>
			</span>
		</div>
		<!-- 信息列表 -->
		<div class="info ui-widget-content">
			<div class="simple line topic">
				<span class="leftIcon ui-icon ui-icon-clock"></span>
				<span class="text">汇总月即将退出营运车辆 -- 小明</span>
				<span class="rightIcons">
					<span class="addComment"><span class="ui-icon ui-icon-document"></span><span class="text link">添加意见</span></span>
					<span class="addAttach"><span class="ui-icon ui-icon-arrowthick-1-n"></span><span class="text link">添加附件</span></span>
					<span class="finish"><span class="ui-icon ui-icon-check"></span><span class="text link">完成办理</span></span>
				</span>
			</div>
			<div class="detail">
				<div class="info ui-widget-content">
					<div class="simple line">
						<span class="leftIcon ui-icon ui-icon-document"></span>
						<span class="text link">意见：XXXXX意见</span>
						<span class="rightIcons">
							<span class="edit"><span class="ui-icon ui-icon-pencil"></span><span class="text link">编辑</span></span>
							<span class="open"><span class="ui-icon ui-icon-document-b"></span><span class="text link">查看</span></span>
							<span class="open"><span class="ui-icon ui-icon-arrowthickstop-1-s"></span><span class="text link">下载</span></span>
							<span class="open"><span class="ui-icon ui-icon-closethick"></span><span class="text link">删除</span></span>
							<span class="collapse"><span class="ui-icon ui-icon-carat-1-ne" title="折叠|展开详细信息"></span></span>
						</span>
					</div>
					<div class="detail line low">
						<span class="leftIcon ui-icon ui-icon-clock low"></span>
						<span class="text low">创建：小张 2012-01-01 08:00，最后修改：小明 2012-01-01 08:00</span>
						<span class="rightIcons">
							<span class="audit"><span class="ui-icon ui-icon-bookmark low"></span><span class="text link low">审计</span></span>
						</span>
					</div>
				</div>
				<div class="info ui-widget-content">
					<div class="simple line">
						<span class="leftIcon ui-icon ui-icon-document"></span>
						<span class="text link">附件：月即将退出营运车辆确认表</span>
						<span class="rightIcons">
							<span class="edit"><span class="ui-icon ui-icon-pencil"></span><span class="text link">编辑</span></span>
							<span class="open"><span class="ui-icon ui-icon-document-b"></span><span class="text link">查看</span></span>
							<span class="open"><span class="ui-icon ui-icon-arrowthickstop-1-s"></span><span class="text link">下载</span></span>
							<span class="open"><span class="ui-icon ui-icon-closethick"></span><span class="text link">删除</span></span>
							<span class="collapse"><span class="ui-icon ui-icon-carat-1-ne" title="折叠|展开详细信息"></span></span>
						</span>
					</div>
					<div class="detail line low">
						<span class="leftIcon ui-icon ui-icon-clock low"></span>
						<span class="text low">创建：小张 2012-01-01 08:00，最后修改：小明 2012-01-01 08:00</span>
						<span class="rightIcons">
							<span class="audit"><span class="ui-icon ui-icon-bookmark low"></span><span class="text link low">审计</span></span>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>