import styled from "@emotion/styled";

type ErrorTextProps = {
    message: string;
}
const StyledErrorP = styled.p`
    color: ${({ theme }) => theme.colors.accentHover};
`
export const ErrorText = ({ message }: ErrorTextProps) => {
    return (
        <StyledErrorP>
            {message}
        </StyledErrorP>
    );
};