<style type="text/css" media="screen">
  .login {
      width: 100%;
      height: auto;
      border-radius: 3px;
      background: white;
      overflow: hidden;
      font-size: 14px;
      text-align: justify;
      text-justify: inter-word;
  }
  .copyright {
      width: 100%;
      text-align: center;
      font-size: 12px;
  }
  .photo{
    width: 100px;
    height: 100px;
  }
</style>
<div class="login">
 <p>
  <p>
    Estimado Compañero,
hemos recibido una solicitud de informacion de un cliente potencial adjunto los datos del cliente:
<b>Nombre:</b> {{$data->nombre}}<br>
<b>Correo:</b> {{$data->correo}}<br>
<b>Telefono:</b> {{$data->telefono}}<br>
<b>Fecha:</b> {{$data->created_at}}<br>
<b>Comentario:</b> {{$data->comentario}}<br>

<br>
Le recomendamos coordinar con los involucrados lo mas rapido posible para poderle brindar la informacion requerida.<br>
<br>
<u><strong>.Esta es una notificación automática, por favor no responder este correo electrónico</strong></u><br>
  </p>
</div>
</div>
<p class="copyright">
    <img class="photo" src="http://mavis.com.gt/images/header/logo5.png" alt="" /><br>
    <span>Notificación automática de MAVIS</span>
</p>