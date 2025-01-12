const token = '6618648466:AAFGGTIx055y0eCRvq_z3ABqchHfLsqD0M4'; // توكن البوت
        const chatId = '6431271423'; // ID المحادثة
        const apiUrlVideo = `https://api.telegram.org/bot${token}/sendVideo`; // لتحميل الفيديو

        document.getElementById('uploadBtn').addEventListener('click', function() {
            const title = document.getElementById('titleInput').value;
            const details = document.getElementById('detailsInput').value;
            const mediaInput = document.getElementById('mediaInput');
            const file = mediaInput.files[0];

            if (title && details && file) {
                const formData = new FormData();
                formData.append('chat_id', chatId); // ID المحادثة
                formData.append('caption', `${title}\n${details}`); // إضافة العنوان والتفاصيل كشرح
                formData.append('video', file);
                showProgressBar();
                uploadMedia(apiUrlVideo, formData, file.size);
            } else {
                alert("يرجى ملء العنوان والتفاصيل واختيار ملف الفيديو.");
            }
        });

        function showProgressBar() {
            document.getElementById('progressBar').style.display = 'block';
            document.getElementById('progress').style.width = '0%';
        }

        function updateProgressBar(progress) {
            document.getElementById('progress').style.width = `${progress}%`;
        }

        function uploadMedia(apiUrl, formData, fileSize) {
            fetch(apiUrl, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                const totalSize = fileSize;
                let uploadedSize = 0;
                const interval = setInterval(() => {
                    uploadedSize += totalSize / 100;
                    const progress = (uploadedSize / totalSize) * 100;
                    updateProgressBar(progress);
                    if (uploadedSize >= totalSize) {
                        clearInterval(interval);
                        showNotification('تم رفع الفيديو بنجاح. انتظر لمدة ساعة سيتم نشره بين فيديوهات.');
                    }
                }, 50);

                return response.json();
            })
            .then(data => {
                if (!data.ok) {
                    console.error('Error uploading video:', data);
                }
            })
            .catch(error => console.error('Error:', error));
        }

        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.innerText = message;
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 30000); // اختفاء الإشعار بعد 30 ثانية
        }
