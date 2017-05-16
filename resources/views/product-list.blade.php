<style>
    .text{
        mso-number-format:'\@';
    }
</style>

<table>
    <tr>
        <th>No.</th>
        <th>Descripción</th>
        <th>Código interno</th>
        <th>Código de barras</th>
        <th>Existencia</th>
        <th>Precio de venta</th>
    </tr>
    @foreach($data as $product)
        <tr>
            <td>{!! $loop->iteration !!}</td>
            <td>{!! $product['description'] !!}</td>
            <td>{!! $product['internal_code'] !!}</td>
            <td class="text"> {!! $product['bar_code'] !!}</td>
            <td>{!! $product['stock'] !!}</td>
            <td>Q. {!! $product['price_sale'] !!}</td>
        </tr>
    @endforeach
</table>