import json 
import sys

def script_run():
    try:
        result = ['1HNkqx9Ahdgi1Ixy2xkKkL', '1ei3hzQmrgealgRKFxIcWn', '7eJMfftS33KTjuF7lTsMCx']

        output = {"result": result}

        output_json = json.dumps(output)
        print(json.decode(output))


        print(output_json)

    except Exception as e:
        error_message = str(e)
        output = {"error2011": error_message}

        output_json = json.dumps(output)
        print(output_json)
        sys.stdout.flush()


if __name__ == "__main__":

    # input_mood = sys.argv[1]

    script_run()
