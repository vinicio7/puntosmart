<h3>Resumen general</h3>
<table>
    <tr>
        <th></th>
        <th>Con documento</th>
        <th>Sin documento</th>
        <th>Anuladas con documento</th>
        <th>Anuladas sin documento</th>
        <th>Total</th>
    </tr>
    <tr>
        <td>Efectivo</td>
        <td>Q. {!! number_format($data['sales_with_printing']['cash'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_without_printing']['cash'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_cancel_with_printing']['cash'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_cancel_without_printing']['cash'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format(($data['sales_with_printing']['cash'] + $data['sales_without_printing']['cash']), 2, '.', ',') !!}</td>
    </tr>
    <tr>
        <td>Tarjeta</td>
        <td>Q. {!! number_format($data['sales_with_printing']['credit_card'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_without_printing']['credit_card'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_cancel_with_printing']['credit_card'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_cancel_without_printing']['credit_card'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format(($data['sales_with_printing']['credit_card'] + $data['sales_without_printing']['credit_card']), 2, '.', ',') !!}</td>
    </tr>
    <tr>
        <td>Cheque</td>
        <td>Q. {!! number_format($data['sales_with_printing']['check'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_without_printing']['check'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_cancel_with_printing']['check'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_cancel_without_printing']['check'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format(($data['sales_with_printing']['check'] + $data['sales_without_printing']['check']), 2, '.', ',') !!}</td>
    </tr>
    <tr>
        <td>Depósito</td>
        <td>Q. {!! number_format($data['sales_with_printing']['down_payment'], 2, '.', ',')!!}</td>
        <td>Q. {!! number_format($data['sales_without_printing']['down_payment'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_cancel_with_printing']['down_payment'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_cancel_without_printing']['down_payment'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format(($data['sales_with_printing']['down_payment'] + $data['sales_without_printing']['down_payment']), 2, '.', ',') !!}</td>
    </tr>
    <tr>
        <td>TOTALES</td>
        <td>Q. {!! number_format($data['sales_with_printing']['total'],2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_without_printing']['total'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_cancel_with_printing']['total'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format($data['sales_cancel_without_printing']['total'], 2, '.', ',') !!}</td>
        <td>Q. {!! number_format(($data['sales_with_printing']['total'] + $data['sales_without_printing']['total']), 2, '.', ',') !!}</td>
    </tr>
</table>

<h3>Ventas</h3>
<table>
    <tr>
        <th>Correlativo</th>
        <th>Usuario de sistema</th>
        <th>Vendedor</th>
        <th>Cliente</th>
        <th>NIT</th>
        <th>Fecha de venta</th>
        <th>Forma de pago</th>
        <th>Impresión</th>
        <th>Estado</th>
        <th>Total de venta</th>
    </tr>
    @foreach($data['sales'] as $sale)
        <tr>
            <td>{!! $sale['correlative'] !!}</td>
            <td>{!! $sale['user']['name'] !!}</td>
            <td>{!! $sale['salesman_name'] !!}</td>
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
                <td>Con documento</td>
            @else
                <td>Sin documento</td>
            @endif
            @if($sale['status'] == 0)
                <td>Activa</td>
                <td>Q. {!! number_format($sale['total'], 2, '.', ',') !!}</td>
            @else
                <td>Anulada</td>
                <td>Q. 0</td>
            @endif
        </tr>
    @endforeach
</table>