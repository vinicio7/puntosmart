<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use Exception;
use Validator;

class UserController extends Controller
{
    protected $result = false;
    protected $message = 'Ocurrió un problema al procesar su solicitud';
    protected $records = array();
    protected $status_code = 400;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Registros consultados correctamente';
            $this->records = User::with('company')->get();
        } catch (Exception $e) {
            $this->status_code = 400;
            $this->result = false;
            $this->message = env('APP_DEBUG') ? $e->getMessage() : $this->message;
        } finally {
            $response = [
                'result' => $this->result,
                'message' => $this->message,
                'records' => $this->records,
            ];

            return response()->json($response, $this->status_code);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            if ($request->input('cancellation')) {
                if ($request->input('cancellation') == true) {
                    $cancellation = 1;
                } else {
                    $cancellation = 0;
                }
                
            } else {
                $cancellation = 0;
            }
            
            $rules = [
                'password' => 'required|min:5'
            ];

            $messages = [
                'password.required' => 'Es necesario que ingrese una contraseña',
                'password.min' => 'La contraseña debe contener más de 5 caracteres',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first());
            } else {
                $user = User::create([
                    'company_id'    => $request->input('company_id'),
                    'name'          => $request->input('name'),
                    'user'          => $request->input('user'),
                    'password'      => bcrypt($request->input('password')),
                    'type'          => $request->input('user'),
                    'cancellation'  => $cancellation
                ]);

                $this->status_code = 200;
                $this->result = true;
                $this->message = 'Usuario registrado correctamente';
                $this->records = $user;
            }
        } catch (Exception $e) {
            $this->status_code = 400;
            $this->result = false;
            $this->message = env('APP_DEBUG') ? $e->getMessage() : $this->message;
        } finally {
            $response = [
                'result' => $this->result,
                'message' => $this->message,
                'records' => $this->records,
            ];

            return response()->json($response, $this->status_code);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $validate_user = User::where('user', $request->input('user'))->where('id', '!=', $id)->first();

            if (!$validate_user) {
                $user = User::find($id);
                $user->company_id = $request->input('company_id', $user->company_id);
                $user->user = $request->input('user', $user->user);
                $user->name = $request->input('name', $user->name);
                if ($request->has('password') && $request->input('password') != '') {
                    $user->password = bcrypt($request->input('password'));
                }
                $user->save();

                $this->status_code = 200;
                $this->result = true;
                $this->message = 'Usuario editado correctamente';
                $this->records = $user;
            } else {
                throw new Exception('Ya existe un registro con el mismo usuario, por favor verifique');
            }
        } catch (Exception $e) {
            $this->status_code = 400;
            $this->result = false;
            $this->message = env('APP_DEBUG') ? $e->getMessage() : $this->message;
        } finally {
            $response = [
                'result' => $this->result,
                'message' => $this->message,
                'records' => $this->records,
            ];

            return response()->json($response, $this->status_code);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $user = User::find($id);
            $user->delete();

            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Usuario eliminado correctamente';
        } catch (Exception $e) {
            $this->status_code = 400;
            $this->result = false;
            $this->message = env('APP_DEBUG') ? $e->getMessage() : $this->message;
        } finally {
            $response = [
                'result' => $this->result,
                'message' => $this->message,
                'records' => $this->records,
            ];

            return response()->json($response, $this->status_code);
        }
    }

    public function login (Request $request)
    {
        try {
            $user = User::where('user', $request->input('user'))->with('company')->first();

            if ($user) {
                if (Hash::check($request->input('password'), $user->password)) {
                    $this->status_code = 200;
                    $this->result = true;
                    $this->message = 'Sesión iniciada correctamente';
                    $this->records = $user;
                } else {
                    throw new Exception('Su contraseña ingresada es incorrecta, por favor verifique');
                }
            } else {
                throw new Exception('El usuario ingresado no existe, por favor verifique');
            }
        } catch (Exception $e) {
            $this->status_code = 400;
            $this->result = false;
            $this->message = env('APP_DEBUG') ? $e->getMessage() : $this->message;
        } finally {
            $response = [
                'result' => $this->result,
                'message' => $this->message,
                'records' => $this->records,
            ];

            return response()->json($response, $this->status_code);
        }
    }
}
