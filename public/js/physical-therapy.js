(function(){
    'use strict';
    console.log('reading js');


    const bicepButton = document.querySelector('#purple1-button');
    const typesContainer = document.querySelector('#physical-types');
    const videoContainer = document.querySelector('#videos');

    const cattip = document.querySelector('#cat-tip');

    bicepButton.addEventListener('click', function(){
        typesContainer.style.display = 'none';
        videoContainer.style.display = 'flex';
        
        cattip.innerHTML = '<img src="imgs/catdefault.png" width="214" height="204" alt="Content calico cat.">';

        cattip.innerHTML += '<p>Strengthen your <span>shoulder, arm, and hand mobility</span>, by following along with these in-depth <span>physical exercises</span>.</p>';

    });


})();