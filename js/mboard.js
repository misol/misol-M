function completeInsertComment(ret_obj)
{
	var error = ret_obj.error;
	var message = ret_obj.message;
	var mid = ret_obj.mid;
	var document_srl = ret_obj.document_srl;
	var comment_srl = ret_obj.comment_srl;

	var url = current_url.setQuery('mid',mid).setQuery('document_srl',document_srl).setQuery('act','');
	if(typeof(jQuery("input[name=parent_srl]").val()) == "undefined") url = url.setQuery('cpage','');
	if(comment_srl) url = url.setQuery('rnd',comment_srl)+"#comment_"+comment_srl;

	location.href = url;
}

function completeDocumentInserted(ret_obj)
{
	var error = ret_obj.error;
	var message = ret_obj.message;
	var mid = ret_obj.mid;
	var document_srl = ret_obj.document_srl;
	var category_srl = ret_obj.category_srl;

	var url;
	if(!document_srl)
	{
		url = current_url.setQuery('mid',mid).setQuery('act','');
	}
	else
	{
		url = current_url.setQuery('mid',mid).setQuery('document_srl',document_srl).setQuery('act','');
	}
	if(category_srl) url = url.setQuery('category',category_srl);

	location.href = url;
}

function completeDeleteComment(ret_obj)
{
	var error = ret_obj.error;
	var message = ret_obj.message;
	var mid = ret_obj.mid;
	var document_srl = ret_obj.document_srl;
	var page = ret_obj.page;

	var url = current_url.setQuery('mid',mid).setQuery('document_srl',document_srl).setQuery('act','');
	if(page) url = url.setQuery('page',page);

	location.href = url;
}

function completeDeleteDocument(ret_obj)
{
	var error = ret_obj.error;
	var message = ret_obj.message;
	var mid = ret_obj.mid;
	var page = ret_obj.page;

	var url = current_url.setQuery('mid',mid).setQuery('act','').setQuery('document_srl','');
	if(page) url = url.setQuery('page',page);

	location.href = url;
}

function msKakaoStoryLink(url,module_title,doc_title,description,image) {
	if(typeof kakao == "undefined") return;
	if(typeof image == "undefined") image = '';
	module_title = decodeURIComponent(module_title);
	doc_title = decodeURIComponent(doc_title);
	description = decodeURIComponent(description);
	var ms_param = {
		post : doc_title + "\n" + url,
		appid : window.location.hostname,
		appver : "1.1.1",
		apiver : "1.0",
		appname : module_title
	};
	if(image) {
		ms_param.urlinfo = JSON.stringify({title:doc_title, desc:description, imageurl:[image]})
	} else {
		ms_param.urlinfo = JSON.stringify({title:doc_title, desc:description})
	}
	kakao.link("story").send(ms_param);
}

function msGetSNSCount(sns,site_url) {
	var param = '';
	if(sns == 'facebook') {
		param = {
			crossDomain:true,
			dataType: "json",
			url: "https://api.facebook.com/method/links.getStats?format=json&urls="+encodeURIComponent(site_url),
			success: function(data){ var vdata = data[0]; if(typeof vdata.total_count == "undefined" || parseInt(vdata.total_count) < 1) return; jQuery("#ms_facebook_count").css('display','inline-block');jQuery("#ms_facebook_count>i").html(vdata.total_count); }
		}
	}
	else if(sns == 'twitter') {
		param = {
			crossDomain:true,
			dataType: "json",
			url: "https://urls.api.twitter.com/1/urls/count.json?url="+encodeURIComponent(site_url)+"&callback=?",
			success: function(data){ if(typeof data.count == "undefined" || parseInt(data.count) < 1) return; jQuery("#ms_twitter_count").css('display','inline-block');jQuery("#ms_twitter_count>i").html(data.count); }
		}
	}
	jQuery.ajax(param);
}