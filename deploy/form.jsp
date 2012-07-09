<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='<s:text name="deploy.title"/>' data-type='form' class="bc-page"
	data-saveUrl='<s:url value="/bc-workflow/deploy/save" />'
	data-js='<s:url value="/bc-workflow/deploy/form.js" />'
	data-initMethod='bc.deployForm.init'
	data-option='<s:property value="formPageOption"/>' style="overflow-y:auto;">
	<s:form name="deployForm" theme="simple" >
		<table  cellspacing="2" cellpadding="0" style="width:545px;"  >
			<tbody>
				<tr class="widthMarker">
					<td style="width: 80px;"></td>
					<td >&nbsp;</td>
				</tr>
				<!-- 类型 -->
				<tr>
					<td class="label">*<s:text name="deploy.type"/>:</td>
					<td >
						<s:select name="e.type" list="#{0:getText('deploy.type.xml'),1:getText('deploy.type.bar')}" listKey="key" listValue="value" data-validate="required" 
								cssClass="ui-widget-content "></s:select>
					</td>
				</tr>
				<!-- 所属分类  排序号-->
				<tr>
					<td class="label">*<s:text name="deploy.category"/>:</td>
					<td class="value"><s:textfield name="e.category" cssClass="ui-widget-content" data-validate="required" /></td>
				</tr>
				<tr>
					<td class="label"><s:text name="deploy.order"/>:</td>
					<td class="value"><s:textfield name="e.orderNo" cssClass="ui-widget-content" /></td>
				</tr>
				<!-- 编码   版本号-->
				<tr>
					<td class="label">*<s:text name="deploy.code"/>:</td>
					<td class="value"><s:textfield name="e.code" cssClass="ui-widget-content" data-validate="required" /></td>
				</tr>
				<tr>
					<td class="label">*<s:text name="deploy.version"/>:</td>
					<td class="value"><s:textfield name="e.version" cssClass="ui-widget-content" data-validate="required" /></td>
				</tr>
				<!-- 标题  -->
				<tr>
					<td class="label">*<s:text name="deploy.tfsubject"/>:</td>
					<td class="value">
						<s:textfield name="e.subject" cssClass="ui-widget-content" data-validate="required"/>
					</td>
				</tr>
				<!-- 原始文件名  -->
				<tr>
					<td class="label">*<s:text name="deploy.source"/>:</td>
					<td class="value">
						<s:textfield name="e.source" cssClass="ui-widget-content" readonly="true" data-validate="required"/>
					</td>
				</tr>
				<tr class="tplFile">
					<td class="label">*<s:text name="deploy.tfpath"/>:</td>
					<td class="value"  >
						<div class="relative">
							<s:textfield name="e.path" cssClass="ui-widget-content" readonly="true" data-validate="required"/>
							<ul class="inputIcons" style="padding-right:8px">
								<li id="upLoadFileId" class="inputIcon ui-icon ui-icon-circle-arrow-n" style="position: relative;">
									<input type="file" class="auto uploadFile" id="uploadFile" name="uploadFile" title="点击上传文件"
										data-cfg='{"callback":"bc.deployForm.afterUploadfile","subdir":"workflow/deploy","source":":input[name=\"e.subject\"]","to":":input[name=\"e.path\"]","ptype":"deploy","puid":"<s:property value="e.uid"/>"}'
										style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;filter: alpha(opacity = 10);opacity: 0;cursor: pointer;">
								</li>
								<li class="downLoadFileId inputIcon ui-icon ui-icon-circle-arrow-s" title='<s:text name="deploy.download"/>' >
								<li id="cleanFileId" class="clearSelect inputIcon ui-icon ui-icon-circle-close" title='<s:text name="title.click2clear"/>'></li>				 
							</ul>
						</div>
					</td>
				</tr>
				<!-- 备注-->
				<tr>
					<td class="topLabel">备注:</td>
					<td class="value" >
						<s:textarea rows="3" name="e.desc"  cssClass="ui-widget-content noresize" />
					</td>
				</tr>
				<tr>
					<td class="label" colspan="4">
						<div class="formTopInfo">
							创建：<s:property value="e.author.name" />(<s:date name="e.fileDate" format="yyyy-MM-dd HH:mm:ss"/>)
							<s:if test="%{e.modifier != null}">
							最后修改：<s:property value="e.modifier.name" />(<s:date name="e.modifiedDate" format="yyyy-MM-dd HH:mm:ss"/>)
							</s:if>
						</div>
					</td>
				</tr>		
			</tbody>
			
			
		</table>
		<s:hidden name="e.id" />
		<s:hidden name="e.uid" />
		<s:hidden name="e.status" />
		<s:hidden name="e.author.id" />
		<input type="hidden" name="e.fileDate" value='<s:date format="yyyy-MM-dd HH:mm:ss" name="e.fileDate" />'/>
	</s:form>
</div>