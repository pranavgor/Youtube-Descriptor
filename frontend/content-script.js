let create_box = (box, url, content)=>{
    let content_box = document.createElement("div");
    content_box.className="content-box";
    content_box.appendChild(document.createElement("p"));
    content_box.firstChild.innerHTML = content;
    content_box.style.width = "100%";
    let wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.appendChild(content_box);
    box.appendChild(wrapper);
};

chrome.runtime.onMessage.addListener(result =>{
    console.log(result.action);

    if(result.action == "Summary Ready"){   
        let box = document.getElementById("Summary-Box");
        box.removeChild(document.getElementById("Load-text"));
        create_box(box, result.video_url, result.summary);
    }

    if(result.action == "Loading Summary"){
        
        let player = document.getElementById('top-row');
        let txt = document.getElementById('Summary-Box');
        if(txt != null)
            txt.remove();
        txt = document.createElement("div");
        txt.style.margin = "auto";
        txt.style.border = "5px solid lightcoral";
        player.parentNode.insertBefore(txt, player.nextSibling);
        while(txt.childNodes.length > 0)
            txt.removeChild(txt.firstChild());
        txt.className = 'style-scope ytd-watch-metadata summary_box';
        txt.id = "Summary-Box";
        let temp = document.createElement("p");
        temp.id = "Load-text";
        temp.innerHTML = "Loading Summary.......";
        txt.appendChild(temp);
        console.log({player, txt});
    }    
    
    if(result.action == "Init"){
        let txt = document.getElementById('Summary-Box');
        if(txt != null)
            txt.remove();
    }
});