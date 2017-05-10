<table>
    <tr>
        <th>Correlativo</th>
        <th>Usuario de sistema</th>
        <th>Cliente</th>
        <th>NIT</th>
        <th>Fecha de venta</th>
        <th>Forma de pago</th>
        <th>Impresión</th>
        <th>Total de venta</th>
    </tr>
    @foreach($data as $sale)
        <tr>
            <td>{!! $sale['correlative'] !!}</td>
            <td>{!! $sale['user']['name'] !!}</td>
            <td>{!! $sale['customer_name'] !!}</td>
            <td>{!! $sale['customer_nit'] !!}</td>
            <td>{!! date('d-m-Y', strtotime($sale['created_at'])) !!}</td>
            @if($sale['type_payment'] == 'cash')
                <td>Efectivo</td>
            @elseif($sale['type_payment'] == 'credit_card')
                <td>Tarjeta</td>
            @elseif($sale['type_payment'] == 'check')
                <td>Cheque</td>
            @elseif($sale['type_payment'] == 'down_payment')
                <td>Depósito</td>
            @endif
            @if($sale['invoice'] == 1)
                <td>Con impresión</td>
            @else
                <td>Sin impresión</td>
            @endif
            <td>Q. {!! number_format($sale['total'], 2, '.', ',') !!}</td>
        </tr>
    @endforeach
</table>