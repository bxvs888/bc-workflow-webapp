<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="ws" title='<s:property value="title"/>'
	data-js='<s:url value="/bc-workflow/workspace/workspace.js"/>'
	data-initMethod='bc.flow.workspace.init'
	data-option='<s:property value="pageOption"/>' style="overflow-y: auto;">
	<!-- 异常信息区 -->
	<div class="error"><s:property value="msg"/>(打开工作空间异常----这里输出友好点的异常信息)</div>
	设计页面在/bc-workflow/workspace/workspaceDesign.jsp
</div>