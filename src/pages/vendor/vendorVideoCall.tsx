import React,{useState,useRef, useEffect,useContext} from 'react'
import { Socket } from 'socket.io-client';
//@ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Button from '@mui/material/Button'
//@ts-ignore
import {PhoneIcon} from '@heroicons/react/solid'
//@ts-ignore
import Peer from 'simple-peer'
import { SocketContext } from '../../context/socketContext';
import { IconButton, TextField } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment'

interface SocketContextValue {
    socket: Socket | null;
    onlineUsers: any[];
    me:any
  }

export const VendorVideoCall = () => {
    console.log("In vide calllllll component")
    // const [ me, setMe ] = useState("")
    // console.log("me is",me)
	const [ stream, setStream ] = useState<MediaStream | null | any>()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState<any>()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef<HTMLVideoElement | null>(null)
	const userVideo = useRef<HTMLVideoElement| null>(null)
	const connectionRef= useRef<any>()

    const socketContext = useContext(SocketContext); 
    const { socket,me } = socketContext as SocketContextValue; 

 
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((mediaStream: MediaStream) => {
                setStream(mediaStream);
                if (myVideo.current) {
                    myVideo.current.srcObject = mediaStream; 
                }
            })
            .catch((error) => {
                console.error("Error accessing media devices.", error);
            });
    
        socket?.on("callUser", (data) => {
            console.log("Receiving call from:", data);
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });
    
        return () => {
            socket?.off('callUser');
        };
    }, []);
    
    const callUser = (id: any) => {
        if (!stream) {
            console.error("Stream not available");
            return;
        }
    
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });
    
        peer.on("signal", (data: any) => {
            socket?.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            });
        });
    
        peer.on("stream", (incomingStream: MediaStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = incomingStream;
            }
        });
    
        socket?.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
    
        connectionRef.current = peer;
    };
    
    const answerCall = () => {
        console.log("Answering the call");
        if (!stream || !callerSignal) {
            console.error("Stream or callerSignal not available");
            return;
        }
    
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });
    
        peer.on("signal", (data: any) => {
            socket?.emit("answerCall", { signal: data, to: caller });
        });
    
        peer.on("stream", (incomingStream: MediaStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = incomingStream;
            }
        });
    
        peer.signal(callerSignal);
        connectionRef.current = peer;
    };
    
    const leaveCall = () => {
        setCallEnded(true);
        if (connectionRef.current) {
            connectionRef.current = null
        }
    };

    console.log("me is",me)

  return (
    <>
    <style>
                {`
                    .container {
	display: grid;
	grid-template-columns: 10fr 4fr;
}

.myId {
	margin-right: 5rem;
	border-radius: 10px;
	background: #c9d6ff; /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #e2e2e2, #c9d6ff); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to right,
		#e2e2e2,
		#c9d6ff
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	padding: 2rem;
	display: grid;
	justify-content: center;
	align-content: center;
}

.call-button {
	text-align: center;
	margin-top: 2rem;
}

.video-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-content: center;
	align-content: center;
	margin-top: 10rem;
	margin-left: 10rem;
}

.caller {
	text-align: center;
	color: #fff;
}

body {
	background: #4776e6; /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #8e54e9, #4776e6); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to right,
		#8e54e9,
		#4776e6
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
                `}
            </style>
                        

    <div className='pt-24'>
      
			<h1 className='font-montserrat font-bold text-2xl' style={{ textAlign: "center", color: '#fff' }}>Let's talk</h1>
           
		<div className="container">
			<div className="video-container">
				<div className="video shadow-md">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "400px" }} />}
				</div>
				<div className="video ps-2 shadow-md">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "400px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
                <div className='font-montserrat rounded-lg'>
                <TextField
					id="filled-basic"
					label="Name"
					variant="filled"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: "20px" }}
                    className='text-black font-montserrat'
				/>
                </div>
                <div  style={{ marginBottom: "2rem" }}>
				<CopyToClipboard text={me}>
					<Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
						Copy ID
					</Button>
				</CopyToClipboard>
                </div>
				<TextField
					id="filled-basic"
					label="ID to call"
					variant="filled"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<Button variant="contained" color="secondary" onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<IconButton aria-label="call" onClick={() => callUser(idToCall)}>
                            <i className ="fi fi-rr-video-camera-alt text-blue-500"></i>
						</IconButton>
                        
					)}
					{idToCall}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
        </div>
		</>

  )
}
