     // تحميل البيانات من ملف JSON خارجي
        fetch('videos.json')
            .then(response => response.json())
            .then(data => {
                const videoLinks = data;

                // تحديد العناصر
                const toggleButton = document.getElementById('toggle-button');
                const videoList = document.getElementById('video-list');
                const videoPlayer = document.getElementById('video-player');
                const videoSource = document.getElementById('video-source');

                // تبديل عرض القائمة المنبثقة
                toggleButton.addEventListener('click', () => {
                    if (videoList.classList.contains('show')) {
                        videoList.classList.remove('show');
                        toggleButton.textContent = 'Channels'; // تغيير النص إلى Open
                    } else {
                        videoList.classList.add('show');
                        toggleButton.textContent = 'Close'; // تغيير النص إلى Close
                        populateVideoList();
                    }
                });

                // تعبئة القائمة المنبثقة
                function populateVideoList() {
                    videoList.innerHTML = ''; // مسح المحتوى الحالي
                    videoLinks.forEach(video => {
                        const button = document.createElement('button');
                        button.textContent = video.name;
                        button.addEventListener('click', () => {
                            videoSource.src = video.url; // تغيير رابط الفيديو
                            videoPlayer.load(); // إعادة تحميل الفيديو لتشغيله
                            videoPlayer.play(); // تشغيل الفيديو
                            videoList.classList.remove('show'); // إخفاء القائمة بعد الضغط
                            toggleButton.textContent = 'OPEN'; // إعادة النص إلى Open
                        });
                        videoList.appendChild(button);
                    });
                }
            })
            .catch(error => {
                console.error('حدث خطأ في تحميل البيانات:', error);
            });
            
    function openPopup() {
      document.getElementById('popup').style.display = 'flex';
    }

    // إغلاق النافذة المنبثقة
    function closePopup() {
      document.getElementById('popup').style.display = 'none';
    }
