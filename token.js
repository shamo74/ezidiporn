// توكن البوت ومعرف المحادثة
const token = '6618648466:AAFGGTIx055y0eCRvq_z3ABqchHfLsqD0M4'; // توكن البوت
const chatId = '6431271423'; // معرف المحادثة

document.getElementById('videoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const videoName = document.getElementById('videoName').value;
  const videoDetails = document.getElementById('videoDetails').value;
  const videoFile = document.getElementById('videoFile').files[0];
  
  if (!videoFile) {
    alert("الرجاء اختيار ملف فيديو.");
    return;
  }

  // إظهار شريط التقدم
  document.getElementById('progressContainer').style.display = 'block';
  document.getElementById('uploadProgress').value = 0;

  // إنشاء FormData
  const formData = new FormData();
  formData.append("videoName", videoName);
  formData.append("videoDetails", videoDetails);
  formData.append("videoFile", videoFile);

  // إرسال البيانات إلى تيليجرام
  const telegramUrl = `https://api.telegram.org/bot${token}/sendVideo`;

  const sendToTelegram = async () => {
    try {
      const response = await fetch(telegramUrl, {
        method: 'POST',
        body: formData,
      });

      const jsonResponse = await response.json();
      
      // إخفاء شريط التقدم عند الانتهاء
      document.getElementById('progressContainer').style.display = 'none';

      if (jsonResponse.ok) {
        document.getElementById('statusMessage').textContent = 'تم رفع الفيديو بنجاح! يرجى الانتظار لمدة ساعتين سيتم نشرها بين الفيديوهات.';
        document.getElementById('statusMessage').style.color = 'green';
      } else {
        document.getElementById('statusMessage').textContent = 'حدث خطأ أثناء رفع الفيديو.';
        document.getElementById('statusMessage').style.color = 'red';
      }
    } catch (error) {
      document.getElementById('progressContainer').style.display = 'none';
      document.getElementById('statusMessage').textContent = 'حدث خطأ في الاتصال.';
      document.getElementById('statusMessage').style.color = 'red';
      console.error(error);
    }
  };

  sendToTelegram();
});
