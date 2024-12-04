import { Button, Card, Container, Form } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';

function App() {
  const [formulario, setFormulario] = useState({});
  const [isEnabled, setIsEnabled] = useState(true);

/*  const questionnaire = {
    preguntas: [
      "¿El profesor muestra interés en el progreso de los estudiantes?",
      "¿El profesor utiliza diferentes métodos de enseñanza?",
      "¿El profesor es accesible para resolver dudas?",
      "¿El profesor fomenta la participación en clase?",
      "¿El profesor explica los conceptos de manera clara?",
      "¿El profesor es puntual en las clases?",
      "¿El profesor respeta las opiniones de los estudiantes?",
      "¿El profesor proporciona retroalimentación constructiva?",
      "¿El profesor crea un ambiente de aprendizaje positivo?",
      "¿El profesor está actualizado en su materia?",
      "¿El profesor establece expectativas claras?",
      "¿El profesor motiva a los estudiantes a aprender?",
      "¿El profesor maneja bien el tiempo durante la clase?",
      "¿El profesor se preocupa por el bienestar emocional de los estudiantes?",
      "¿El profesor fomenta el trabajo en equipo?",
      "¿El profesor utiliza recursos didácticos variados?",
      "¿El profesor maneja adecuadamente la disciplina en clase?",
      "¿El profesor es amable y respetuoso con los estudiantes?",
      "¿El profesor adapta su enseñanza a las necesidades de los estudiantes?",
      "¿El profesor fomenta el pensamiento crítico entre los estudiantes?"
    ],
    opciones: [
      "Siempre",
      "A veces",
      "Rara vez",
      "Nunca"
    ]
  }; */

  const onChange = (e) => {
    e.preventDefault();
    const obj = { ...formulario };
    obj[e.target.name] = e.target.value;
    setFormulario(obj);
    console.log(obj);
    
  const onSubmit = async ()=> {
    //Validar que las preguntas fueron contestadas
    const questionsUnanswered = [];
    questionnaire.preguntas.map((_,i)=>{
      if(!answers[`pregunta_${i}`]){
        questionsUnanswered.push(i + 1)
      }
    })
    if(questionsUnanswered.length > 0){
      Swal.fire(
        "Oops!, parece que faltan preguntas por contestar",
        questionsUnanswered.join(', '), //Unir con la coma
        "error"
      );
      return;
    }
    Swal.fire("Enviando respuestas")
    Swal.showLoading()
    try {
      await axios.post("http://localhost:4000/save-answers", answers);
      Swal.fire("Respuestas guardadas con éxito", "", "success")
      .then(()=>window.location.reload)
    } catch (error) {
      Swal.fire("Oops!, Ocurrió un error al guardar tus respuestas", error.msg, "error")
    }
  }

    if (
      formulario.TutorName && formulario.TutorName !== "" &&
      formulario.StudentName && formulario.StudentName !== "" &&
      formulario.Subject && formulario.Subject !== ""
    ) {
      setIsEnabled(false);
    }
  };

  return (
    <Container>
      <Card className='mt-3'>
        <Card.Body>
          <Card.Title>Formulario para Evaluación de Tutores</Card.Title>

 {/* Información alumno */}
          <Card className='mt-3'>
            <Card.Body>
              <h5>Información Alumno</h5>
              <Form.Group className='mb-3'>
                <Form.Label>Correo institucional</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo institucional"
                  value={formulario.email || ""}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control onChange={onChange} placeholder='Ingresa el nombre del estudiante' name='StudentName' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿A qué grupo perteneces?</Form.Label>
                <Form.Control onChange={onChange} placeholder='Ingresa tu grupo' name='grupo' />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Información General */}
          <Card className='mt-3'>
            <Card.Body>
              <h5>Información General</h5>
              <Form.Group className='mb-3'>
                <Form.Label>¿Quién es tu tutor?</Form.Label>
                <Form.Control onChange={onChange} placeholder='Ingresa el nombre del tutor' name='TutorName' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿Qué asignatura estás tomando?</Form.Label>
                <Form.Control onChange={onChange} placeholder='Ingresa la asignatura' name='Subject' />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Preparación y Conocimiento */}
          <Card className='mt-3'>
            <Card.Body>
              <h5>Preparación y Conocimiento</h5>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor demuestra un buen conocimiento de la materia?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='conocimiento' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor está bien preparado para las sesiones?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='Preparation' />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Métodos de Enseñanza */}
          <Card className='mt-3'>
            <Card.Body>
              <h5>Métodos de Enseñanza</h5>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor explica los conceptos claramente?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='Conceptos' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor utiliza ejemplos prácticos para facilitar el aprendizaje?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='Examples' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor adapta sus métodos de enseñanza según las necesidades del estudiante?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='enseñanza' />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Interacción y Comunicación */}
          <Card className='mt-3'>
            <Card.Body>
              <h5>Interacción y Comunicación</h5>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor fomenta una buena comunicación?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='Communication' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor está disponible para responder preguntas fuera de las horas de clase?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='disponibilidad' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor es paciente y comprensivo?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='comprension' />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Compromiso y Puntualidad */}
          <Card className='mt-3'>
            <Card.Body>
              <h5>Compromiso y Puntualidad</h5>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor es puntual y respetuoso con el tiempo?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='puntualidad' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor demuestra interés genuino en el progreso del estudiante?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='Interest' />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Ambiente de Aprendizaje */}
          <Card className='mt-3'>
            <Card.Body>
              <h5>Ambiente de Aprendizaje</h5>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor crea un ambiente de aprendizaje positivo y motivador?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='aprendizaje' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor motiva al estudiante a participar activamente en las sesiones?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='Motivation' />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Resultado del Aprendizaje */}
          <Card className='mt-3'>
            <Card.Body>
              <h5>Resultado del Aprendizaje</h5>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor ayuda a mejorar las habilidades y el rendimiento académico del estudiante?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='rendimiento' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿El tutor proporciona retroalimentación constructiva y útil?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='retroalimentacion' />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Satisfacción General */}
          <Card className='mt-3'>
            <Card.Body>
              <h5>Satisfacción General</h5>
              <Form.Group className='mb-3'>
                <Form.Label>¿Qué es lo que más te gusta del tutor?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='Likes' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿Hay algo que el tutor pueda mejorar?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='mejorar' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>¿Recomendarías al tutor a otros estudiantes?</Form.Label>
                <Form.Control as='textarea' rows={2} onChange={onChange} name='Recommendation' />
              </Form.Group>
            </Card.Body>
          </Card>

          <div className="mt-3">
            <Button disabled={isEnabled} variant="outline-success" type='submit'>Enviar</Button>
            <Button variant="outline-danger" type='reset'>Cancelar</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;