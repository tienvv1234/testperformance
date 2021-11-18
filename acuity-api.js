const request = require("request");

class AcuityApi {
  constructor() {
    this.req = request.defaults({
      headers: {
        "content-type": "application/json",
      },
      auth: {
        user: "16696944",
        pass: "36fa76dda4beb013aa48228da563f53f",
      },
      baseUrl: "https://acuityscheduling.com/api/v1/",
    });
  }

  getAppointmentsType = async () => {
    try {
      const response = await this.request("get", "/appointment-types");
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  createAppointment = async (appointment) => {
    try {
      const response = await this.request("post", "/appointments", appointment);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  getAppointmentById = async (id) => {
    try {
      const response = await this.request("get", `/appointments${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  request = (method, url, option) => {
    return new Promise((resolve, reject) => {
      this.req.post(url, option, (err, res) => {
          console.log(res.request)
        if (err) {
          // TODO: handle err
          reject(err);
        } else if (res && res.statusCode === 200) {
          // TODO Do something with response
          resolve(res.body);
        } else {
          reject(
            new Error(
              (res && `${res.statusMessage}: ${res.body}`) ||
                `some thing went wrong in ${method} request \n ${url} \n ${option}`
            )
          );
        }
      });
    });
  };
}

const api = new AcuityApi();
// console.log('api.getAppointmentsType();')
// api.getAppointmentsType().then((data) => {
//     console.log('data', data);
// }).catch(err => console.error(err));



api.createAppointment({
    body: JSON.stringify({
        datetime: "2021-02-03T14:00:00-0800",
        appointmentTypeID: 11121057,
        firstName: "Bob",
        lastName: "McTest",
        email: "bob.mctest@example.com",
        certificate: "ABC123",
        fields: [{ id: 1, value: "Party time!" }],
        labels: [{ id: 1 }],
      }),
}).then((data) => {
    console.log('data', data)
}).catch(err => console.error(error));
